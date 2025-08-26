const ActivityHistory = require("../models/ActivityHistory.js");
const Quiz = require("../models/Quiz.js");
const User = require("../models/User.js");
const QuizTranslation = require("../models/QuizTranslation.js");

const levelToThresholdMap = {
  1: 50,
  2: 50,
  3: 50,
  4: 50,
  5: 75,
  6: 75,
};

/*
* submitAnswer
find total answers , 
how many are correct ,
its level

for each submission :
1. check if it has history:
    if yes:
        if it's not accepted:
            if it's correct:
                update history to accepted
                add points
        else:
            do nothing
    else:
        create new history
        if its correct:
            put accepted
            add points
        else:
            put rejected   


Add the newly accepted questions points in the user
if it satisfies the level threshold then update level
    level++



**/
const submitAnswer = async (req, res) => {
  try {
    const { submitions } = req.body;
    const userId = req.user._id;
    const token = req.headers.authorization.split(" ")[1];

    if (!submitions || !Array.isArray(submitions) || submitions.length === 0) {
      return res.status(400).json({ message: "submitions must be a non-empty array" });
    }

    console.log({ submitions });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const level = submitions[0].level;
    if (!level) {
      return res.status(400).json({ message: "Level is required in submissions" });
    }

    // Total number of questions in this level
    const total = await Quiz.countDocuments({ level });

    let newlyAcceptedPoints = 0;

    // Process new submissions
    for (const submission of submitions) {
      const { quizId, selectedoption, isCorrect, points } = submission;

      let history = await ActivityHistory.findOne({ userId, QuidId: quizId });

      if (history) {
        if (history.status !== "accepted" && isCorrect) {
          // Update to accepted
          history.status = "accepted";
          history.selected_option = selectedoption;
          await history.save();
          newlyAcceptedPoints += points;
        }
      } else {
        const newStatus = isCorrect ? "accepted" : "attempted";
        await ActivityHistory.create({
          userId,
          QuidId: quizId,
          status: newStatus,
          selected_option: selectedoption,
        });

        if (isCorrect) {
          newlyAcceptedPoints += points;
        }
      }
    }

    // Count total correct answers (already accepted + new)
    const correct = await ActivityHistory.countDocuments({
      userId,
      status: "accepted",
      // filter by level: get all Quiz ids with that level
      QuidId: { $in: await Quiz.find({ level }).distinct('_id') },
    });

    // Update user's points
    user.points += newlyAcceptedPoints;

    const percentageCorrect = (correct / total) * 100;
    const requiredPercentage = levelToThresholdMap[level] || 0;

    let isLevelUp = false;
    if (percentageCorrect >= requiredPercentage && user.level === level) {
      user.level += 1;
      isLevelUp = true;
    }

    await user.save();

    const userObj = user.toObject();
    userObj.accessToken = token;

    return res.json({
      message: "Submission processed successfully",
      totalAnswers: total,
      correctAnswers: correct,
      level,
      isLevelUp,
      newlyAcceptedPoints,
      user: userObj,
    });

  } catch (error) {
    console.error("❌ Error in submitAnswer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


/*
{
  "question": {
    "en": "What is capital of India?",
    "hi": "भारत की राजधानी क्या है?",
    "pa": "ਭਾਰਤ ਦੀ ਰਾਜਧਾਨੀ ਕੀ ਹੈ?",
    "ta": "இந்தியாவின் தலைநகரம் என்ன?"
  },
  "options": {
    "en": ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    "hi": ["दिल्ली", "मुंबई", "चेन्नई", "कोलकाता"],
    "pa": ["ਦਿੱਲੀ", "ਮੁੰਬਈ", "ਚੇਨਈ", "ਕੋਲਕਾਤਾ"],
    "ta": ["டெல்லி", "மும்பை", "சென்னை", "கொல்கத்தா"]
  },
  "answer": 0,
  "level": 1,
  "points": 10
}
**/

const addQuiz = async (req, res) => {
  try {
    const { question, options, answer, level, points, topic } = req.body;

    // 1️⃣ Create main Quiz (english)
    const newQuiz = await Quiz.create({
      question: question.en,
      options: options.en,
      answer,
      level,
      points,
      topic,
    });

    // 2️⃣ Create translations (for other languages)
    const translations = [];

    ["hi", "pa", "ta"].forEach((lang) => {
      if (question[lang] && options[lang]) {
        translations.push({
          qid: newQuiz._id,
          language: lang,
          question: question[lang],
          options: options[lang],
        });
      }
    });

    await QuizTranslation.insertMany(translations);

    return res.json({
      message: "Quiz added successfully",
      newQuiz,
    });
  } catch (error) {
    console.error("❌ Error in addQuiz:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Add multiple quizzes with translations
 * Expected req.body: array of quiz objects
 */
const addQuizzes = async (req, res) => {
  try {
    const quizzes = req.body;

    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      return res.status(400).json({ message: "Input should be a non-empty array of quizzes." });
    }

    const createdQuizzes = [];

    for (const quizData of quizzes) {
      const { question, options, answer, level, points, topic } = quizData;

      // Create main quiz (default English)
      const newQuiz = await Quiz.create({
        question: question.en,
        options: options.en,
        answer,
        level,
        points,
        topic,
      });

      // Prepare translations
      const translations = [];

      ["hi", "pa", "ta"].forEach((lang) => {
        if (question[lang] && options[lang]) {
          translations.push({
            qid: newQuiz._id,
            language: lang,
            question: question[lang],
            options: options[lang]
          });
        }
      });

      if (translations.length > 0) {
        await QuizTranslation.insertMany(translations);
      }

      createdQuizzes.push(newQuiz);
    }

    return res.json({
      message: "Quizzes added successfully",
      count: createdQuizzes.length,
      quizzes: createdQuizzes,
    });
  } catch (error) {
    console.error("❌ Error in addQuizzes:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllQuizzes = async (req, res) => {
  try {
    const language = req.headers.language || "en";

    // get level: first check from query param, else from req.user.level
    const level = req.query.level
      ? parseInt(req.query.level)
      : req.user && req.user.level
      ? req.user.level
      : null;

    if (!level) {
      return res.status(400).json({ message: "Level is required" });
    }

    let quizzes;

    if (language === "en") {
      quizzes = await Quiz.find({ level }).lean(); // .lean() makes it plain JS objects so we can add fields
    } else {
      quizzes = await Quiz.aggregate([
        { $match: { level } },
        {
          $lookup: {
            from: "quiztranslations",
            let: { quizId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$qid", { $toObjectId: "$$quizId" }] }, // Convert to ObjectId
                      { $eq: ["$language", language] },
                    ],
                  },
                },
              },
            ],
            as: "translation",
          },
        },
        {
          $addFields: {
            translation: { $arrayElemAt: ["$translation", 0] },
          },
        },
        {
          $addFields: {
            question: { $ifNull: ["$translation.question", "$question"] },
            options: { $ifNull: ["$translation.options", "$options"] },
            topic:{ $ifNull: ["$translation.topic", "$topic"] },
            // Ensure _id is preserved as ObjectId
            _id: { $toString: "$_id" }, // Convert to string if needed
          },
        },
        {
          $project: {
            translation: 0,
          },
        },
      ]);
    }

    // find histories for these quizzes
    const quizIds = quizzes.map((quiz) => quiz._id);
    const activityHistoryList = await ActivityHistory.find({
      userId: req.user._id,
      QuidId: { $in: quizIds },
    }).lean();

    // make a map: quizId -> history
    const historyMap = {};
    activityHistoryList.forEach((history) => {
      historyMap[history.QuidId.toString()] = history;
    });

    // add history field to each quiz
    const quizzesWithHistory = quizzes.map((quiz) => {
      const history = historyMap[quiz._id.toString()] || null;
      return { ...quiz, history };
    });

    return res.json({ quizzes: quizzesWithHistory });
  } catch (err) {
    console.error("❌ Error in getAllQuizzes:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    await Quiz.deleteOne({ _id: quizId });
    await QuizTranslation.deleteMany({ qid: quizId });

    return res.json({
      message: "Quiz and its translations deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error in deleteQuiz:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllLevelsSummary = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const language = req.headers.language?.trim().toLowerCase() || "en";

    const pipeline = [];

    // Match all quizzes
    pipeline.push({ $match: {} });

    // For Hindi and Punjabi, lookup translations
    if (["hi", "pa"].includes(language)) {
      pipeline.push(
        {
          $lookup: {
            from: "quiztranslations",
            let: { quizId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$qid", "$$quizId"] },
                      { $eq: ["$language", language] },
                    ],
                  },
                },
              },
            ],
            as: "translation",
          },
        },
        {
          $addFields: {
            translation: { $arrayElemAt: ["$translation", 0] },
            question: {
              $ifNull: ["$translation.question", "$question"],
            },
            options: {
              $ifNull: ["$translation.options", "$options"],
            },
            topic: {
              $ifNull: ["$translation.topic", "$topic"], // prefer translation, fallback to original
            },
          },
        },
        { $project: { translation: 0 } }
      );
    }

    // Lookup user's activity history
    pipeline.push(
      {
        $lookup: {
          from: "activityhistories",
          let: { quizId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$QuidId", "$$quizId"] },
                userId: userId,
              },
            },
          ],
          as: "history",
        },
      },
      {
        $addFields: {
          history: { $arrayElemAt: ["$history", 0] },
        },
      }
    );

    // Group by level
    pipeline.push(
      {
        $group: {
          _id: "$level",
          topic: { $first: "$topic" }, // already processed above
          questionCount: { $sum: 1 },
          totalPoints: { $sum: "$points" },
          pointsScored: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ["$history", null] },
                    { $eq: ["$history.status", "accepted"] },
                  ],
                },
                "$points",
                0,
              ],
            },
          },
          reAttempt: {
            $max: { $cond: [{ $gt: ["$history", null] }, true, false] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          level: "$_id",
          topic: 1,
          questionCount: 1,
          reAttempt: 1,
          totalPoints: 1,
          pointsScored: 1,
        },
      },
      { $sort: { level: 1 } }
    );

    const result = await Quiz.aggregate(pipeline);


    return res.json({ levels: result });
  } catch (err) {
    console.error("❌ Error in getAllLevelsSummary:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  submitAnswer,
  addQuiz,
  getAllQuizzes,
  deleteQuiz,
  getAllLevelsSummary,
  addQuizzes
};
