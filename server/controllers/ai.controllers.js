const User = require("../models/User");
const { analyzeImageGoogle } = require("../helper/gemini.helper");
const getGroqData = require("../helper/groq.helper");
const ChatModel = require("../models/chat.model");
const GoalModel = require("../models/goal.models");
const getOpenAIData = require("../helper/gpt.helper");

function extractJSON(text) {
    try {
        const match = text.match(/{[\s\S]*?}/);
        if (!match) throw new Error("No valid JSON object found in response.");
        return JSON.parse(match[0]);
    } catch (err) {
        console.error("JSON parsing failed:", err.message);
        throw new Error("Failed to extract JSON from response.");
    }
}



const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const chats = await ChatModel.find({ sender: userId });
        return res.json(chats);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

// === Helpers ===
const SUPPORTED_LANGS = {
    hi: { name: "Hindi", script: "देवनागरी" },
    pa: { name: "Punjabi", script: "ਗੁਰਮੁਖੀ" },
    en: { name: "English", script: "English" }
};

function getLanguageConfig(language) {
    const langCode = (language || "en").toLowerCase();
    return SUPPORTED_LANGS[langCode] || SUPPORTED_LANGS.en;
}


// Main AI response handler with fallback
async function getAIResponse(finalPrompt, language) {
    try {
        if (language === "pa") {
            // Use OpenAI only for Punjabi
            const openAIResponse = await getOpenAIData(finalPrompt);

            if (openAIResponse?.trim()) {
                return openAIResponse;
            } else {
                console.warn(`OpenAI returned empty for Punjabi, falling back to Groq...`);
            }
        } else {
            console.info(`Skipping OpenAI since language is ${language}, using Groq directly...`);
        }
    } catch (err) {
        console.warn(`OpenAI failed for Punjabi: ${err.message}, using Groq fallback...`);
    }

    // Always return Groq if OpenAI fails, is skipped, or returns empty
    try {
        const groqResponse = await getGroqData(finalPrompt);
        return groqResponse?.trim() || "⚠️ No response from AI provider.";
    } catch (err) {
        console.error(`Groq failed: ${err.message}`);
        return "❌ AI services are currently unavailable.";
    }
}


function buildStrictScriptPrompt({ scriptLanguage, scriptInstruction, roleIntro, context }) {
    return `
You MUST respond ONLY in ${scriptLanguage} and use its native script. DO NOT use English script.

⚠️ Output Instructions:
- Language: STRICTLY ${scriptLanguage}
- Script: STRICTLY ${scriptInstruction}
- No English transliterations unless for technical terms (UPI, ATM, PAN, etc.)
- Be concise and contextually helpful.
- Make sure to not include any asterisk (*) or bold text or any other text attribute or anything else
- Make sure you treat the currency as INR Indian Rupees ₹ if not specified
Role Instructions:
${roleIntro}

${context}
`;
}

const checkForSpam = async (req, res) => {
    try {
        const { prompt = "None" } = req.body;
        const { language } = req.headers;

        // Get language config
        const { name: scriptLanguage, script: scriptInstruction } = getLanguageConfig(language);

        // Handle image safely
        let imageData = "None";
        if (req.file) {
            try {
                imageData = await analyzeImageGoogle(req.file);
            } catch (err) {
                console.warn("Image analysis failed, using 'None':", err.message);
            }
        }

        // Role instructions
        const roleIntro = `
You are a strict multilingual security AI system.
Your task is to analyze the given message and optional image description to determine if it falls under:
1. Scam
2. Safe

You must:
- Detect fake offers, malicious links, financial frauds, blackmail attempts, impersonation, or misinformation.
- Consider image context to identify NSFW, threats, or suspicious elements.

⚠️ Output Requirements:
- Language: STRICTLY ${scriptLanguage} only
- Script: Use full native script (${scriptInstruction})
- DO NOT use English transliterations like "yeh", "hai", "click", etc.
- Use formal grammar and vocabulary native to ${scriptLanguage}.
- Response must ONLY be valid JSON.
- Keys: label (always English) and reason (in ${scriptLanguage}).
`;

        // Context for analysis
        const context = `
Message:
${prompt}

Image Description:
${imageData}

Example Output:
{
  "label": "Scam",
  "reason": "यह संदेश एक नकली ईनाम के बहाने धोखाधड़ी करने का प्रयास है। इसमें उपयोगकर्ता को एक संदिग्ध लिंक पर क्लिक करने के लिए उकसाया गया है।"
}

Now analyze the current input and respond strictly in the same JSON format and language.
`;

        // Build final strict-script prompt
        const finalPrompt = buildStrictScriptPrompt({
            scriptLanguage,
            scriptInstruction,
            roleIntro,
            context
        });

        // Get AI response with OpenAI→Groq fallback
        const aiRawResult = await getAIResponse(finalPrompt, language);
        console.log("AI Raw Result:", aiRawResult); // ✅ Debug log
        const result = extractJSON(aiRawResult);

        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Error during scam/spam check:", error);
        res.status(500).json({ success: false, message: "Spam check failed." });
    }
};

// === Controllers ===
const chat = async (req, res) => {
    try {
        const user_id = req.user._id;
        const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { prompt } = req.body;
        const { language } = req.headers;
        if (!prompt) return res.status(400).json({ message: "Missing prompt" });

        const { name: scriptLanguage, script: scriptInstruction } = getLanguageConfig(language);

        // Fetch previous chat context
        const oldChat = JSON.stringify(
            await ChatModel.find({ sender: user_id })
                .select("message createdAt updatedAt")
                .lean()
        );

        // Handle image safely — if fails, set to "None"
        let imageData = "None";
        if (req.file) {
            try {
                imageData = await analyzeImageGoogle(req.file);
            } catch (err) {
                console.warn("Image analysis failed, defaulting to None:", err.message);
                imageData = "None";
            }
        }

        // Build final strict-script prompt
        const finalPrompt = buildStrictScriptPrompt({
            scriptLanguage,
            scriptInstruction,
            roleIntro: `You are **DhanRakshak AI**, a ${scriptLanguage} ${scriptInstruction} financial advisor 
                        guiding on savings, investments, banking safety, scams, and insurance.`,
            context: `
User: ${user.name}
Image Description: ${imageData}
Previous Chat Context: ${oldChat}
Prompt: ${prompt}
`
        });

        // Get AI response with fallback
        let result = await getAIResponse(finalPrompt, language);
        if (typeof result === "string") {
            result = result.replaceAll("*", "");
        }
        // Save chat entry
        const chatEntry = await ChatModel.create({
            sender: user_id,
            message: prompt,
            response: result
        });

        res.status(200).json(chatEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "DhanRakshak AI chat failed."
        });
    }
};

const getGoalTip = async (req, res) => {
    try {
        const { goal_id } = req.params;
        const { language } = req.headers;

        if (!goal_id) return res.status(400).json({ message: "Missing goal_id" });

        const { name: scriptLanguage, script: scriptInstruction } = getLanguageConfig(language);
        const goal = await GoalModel.findById(goal_id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        const finalPrompt = buildStrictScriptPrompt({
            scriptLanguage,
            scriptInstruction,
            roleIntro: "You give personalized financial goal tip.",
            context: `
Here is the user's goal: ${JSON.stringify(goal)}
Give one concise, practical tip
`
        });

        const tip = await getAIResponse(finalPrompt, language);
        res.status(200).json({ success: true, result: { tip } });
    } catch (error) {
        console.error("Goal tip error:", error);
        res.status(500).json({ message: "Request Failed", error: error.message });
    }
};

const getWordDefinition = async (req, res) => {
    try {
        const { word } = req.body;
        const { language } = req.headers;

        if (!word) return res.status(400).json({ message: "Missing word" });

        const { name: scriptLanguage, script: scriptInstruction } = getLanguageConfig(language);
        const finalPrompt = buildStrictScriptPrompt({
            scriptLanguage,
            scriptInstruction,
            roleIntro: "You are a dictionary assistant providing clear definition.",
            context: `
Word: "${word}"
Return the definition only
`
        });

        const definition = await getAIResponse(finalPrompt, language);
        res.status(200).json({ success: true, result: { definition } });
    } catch (error) {
        console.error("Definition error:", error);
        res.status(500).json({ message: "Request Failed" });
    }
};

module.exports = { chat, getGoalTip, getWordDefinition };




module.exports = { checkForSpam, chat, getChats, getGoalTip, getWordDefinition };
