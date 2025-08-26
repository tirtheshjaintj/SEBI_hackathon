const reportModel = require("../models/report.model");
const User = require("../models/User"); // ✅ Make sure this is the correct path
const getGroqData = require("../helper/groq.helper");
const axios = require("axios");


const addReportApp = async (req, res) => {
    try {
        const { app_id, message = "It is spam App" } = req.body;
        if (!app_id) return res.status(404).json({ message: "App ID not found" });

        const user_id = req.user?._id;
        const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingReport = await reportModel.findOne({ user_id, app_id });
        if (!existingReport) {
            await reportModel.create({ user_id, app_id, message });
        } else {
            existingReport.message = message;
            await existingReport.save();
        }

        res.status(200).json({ message: "App reported successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const viewReportApp = async (req, res) => {
    try {
        const user_id = req.user._id;
        const reportCounts = await reportModel.aggregate([
            { $match: { app_id: { $ne: null } } }, // Ensure only app reports are counted
            {
                $group: {
                    _id: "$app_id",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    app_id: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        const reportData = reportCounts.reduce((acc, cur) => {
            acc[cur.app_id] = cur.count;
            return acc;
        }, {});
        const userReported = await reportModel.find({ user_id, app_id: { $ne: null } }).select("app_id");
        const reportedApps = userReported.map((report) => report.app_id);
        res.status(200).json({ reportData, reportedApps });

    } catch (error) {
        console.error("Error in viewReportApp:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const addReportCall = async (req, res) => {
    try {
        const { phone_number, message = "It is spam Phone Number" } = req.body;
        if (!phone_number) return res.status(404).json({ message: "Phone number not found" });

        const user_id = req.user?._id;
        const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingReport = await reportModel.findOne({ user_id, phone_number });
        if (!existingReport) {
            await reportModel.create({ user_id, phone_number, message });
        } else {
            existingReport.message = message;
            await existingReport.save();
        }

        res.status(200).json({ message: "Phone number reported successfully" });
    } catch (error) {
        console.error("Error in addReportCall:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const viewReportCall = async (req, res) => {
    try {
        const user_id = req.user._id;
        const reportCounts = await reportModel.aggregate([
            { $match: { phone_number: { $ne: null } } }, // Only phone reports
            {
                $group: {
                    _id: "$phone_number",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    phone_number: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        const reportData = reportCounts.reduce((acc, cur) => {
            acc[cur.phone_number] = cur.count;
            return acc;
        }, {});

        const userReported = await reportModel.find({ user_id, phone_number: { $ne: null } }).select("phone_number");
        const reportedNumbers = userReported.map((report) => report.phone_number);
        res.status(200).json({ reportData, reportedNumbers });
    } catch (error) {
        console.error("Error in viewReportCall:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const checkSpam = async (req, res) => {
    try {
        const { phone_number, message = "" } = req.query;
        console.log(phone_number, message);

        const reportCount = await reportModel.countDocuments({ phone_number });
        if (reportCount >= 1) {
            return res.json({ spam: true });
        }
        console.log(phone_number);
        let messageSpam = false;

        if (message.trim() !== "") {
            const prompt = `
Only respond with "spam" or "safe" (case-insensitive) based on whether this message is potentially harmful, a fraud, or a fake offer:
"${message}"
`;
            const response = await getGroqData(prompt);
            console.log(response);
            const label = response.trim().toLowerCase();
            if (label === "spam") messageSpam = true;
        }

        return res.json({ spam: messageSpam });
    } catch (error) {
        console.error("checkSpam error:", error);
        res.status(500).json({ spam: false });
    }
};


// const checkSpam = async (req, res) => {
//     try {
//         const { phone_number, message = "" } = req.query;
//         console.log(phone_number, message);

//         const reportCount = await reportModel.countDocuments({ phone_number });
//         if (reportCount >= 1) {
//             return res.json({ spam: true });
//         }
//         console.log(phone_number);
//         let messageSpam = false;

//         if (message.trim() !== "") {

//             function detectMajorityLanguage(text) {
//                 const patterns = {
//                     hi: /[\u0900-\u097F]/g,   // Devanagari (Hindi)
//                     pa: /[\u0A00-\u0A7F]/g,   // Gurmukhi (Punjabi)
//                     en: /[A-Za-z]/g           // English
//                 };

//                 const counts = {
//                     hi: 0,
//                     pa: 0,
//                     en: 0
//                 };

//                 for (const lang in patterns) {
//                     const matches = text.match(patterns[lang]);
//                     counts[lang] = matches ? matches.length : 0;
//                 }

//                 const total = counts.hi + counts.pa + counts.en;

//                 if (total === 0) return 'unknown';

//                 // Find language with max count
//                 let maxLang = 'unknown';
//                 let maxCount = 0;

//                 for (const lang in counts) {
//                     if (counts[lang] > maxCount) {
//                         maxCount = counts[lang];
//                         maxLang = lang;
//                     }
//                 }

//                 return maxLang;
//             }

//             const language = detectMajorityLanguage(message);

//             let response = null;
//             if (language == 'hi') {
//                 response = await axios.post(process.env.SPAM_DETECTION_URI_HI, { text: message });
//             } else if (language == 'pa') {
//                 response = await axios.post(process.env.SPAM_DETECTION_URI_PA, { text: message });
//             } else {
//                 response = await axios.post(process.env.SPAM_DETECTION_URI_EN, { text: message });
//             }

//             if (response.data.isSpam) messageSpam = true;
//         }

//         return res.json({ spam: messageSpam });
//     } catch (error) {
//         console.error("checkSpam error:", error);
//         res.status(500).json({ spam: false });
//     }
// };

const getReports = async (req, res) => {
    try {
        const { phone_number } = req.query;
        const user_id = req.user?._id;

        if (!phone_number) {
            return res.status(400).json({ message: "phone_number is required" });
        }

        const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const reports = await reportModel.find({ phone_number })
            .populate({
                path: "user_id",
                select: "name"
            })
            .select("message user_id")
            .lean();

        // Check if this user has reported the phone number
        const userHasReported = reports.some(report => String(report.user_id?._id) === String(user_id));

        return res.json({
            reported: userHasReported,
            reports,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




module.exports = {
    addReportApp,
    viewReportApp,
    addReportCall,
    viewReportCall,
    checkSpam,
    getReports
};
