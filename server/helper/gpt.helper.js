const { OpenAI } = require("openai");
const openaiApiKey = process.env.OPENAI_API_KEY || "";
const openai = new OpenAI({ apiKey: openaiApiKey });

async function getOpenAIData(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });
        console.log(response.choices[0]?.message?.content);
        return response.choices[0]?.message?.content || "";
    } catch (error) {
        if (error.code === "insufficient_quota" || error.status === 429) {
            console.error("API quota exceeded. Please check your billing and usage.");
            return "Sorry, the API quota has been exceeded. Please try again later.";
        }
        console.error("OpenAI API error:", error);
        throw new Error("OpenAI API Failed");
    }
}

module.exports = getOpenAIData;
