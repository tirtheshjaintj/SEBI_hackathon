const express = require("express");
const cors = require("cors");
const connectDb = require("./db/index.js");
const dotenv = require("dotenv");
dotenv.config();
const decryptBodyMiddleware = require("./middlewares/decryptBody.js");
const app = express();

const { errorHandler } = require("./helper/error.helper.js");
// const cron = require("node-cron");
// const { fetchAndSaveNews } = require("./utils/node-cron-fun.js");

// Enable CORS for all origins
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(decryptBodyMiddleware);


// Routes
const userRoutes = require("./routes/user.routes.js");
const quizRoutes = require("./routes/quiz.routes.js");
const newsRoutes = require("./routes/news.routes.js");
const postRoutes = require("./routes/post.routes.js");
const budgetRoutes = require("./routes/budget.route.js");
const reportRoutes = require("./routes/report.route.js");
const aiRouter = require("./routes/ai.route.js");
const notificationRoutes = require("./routes/notification.route.js");
const merchandiseRoutes = require("./routes/merchandise.route.js");
const paymentRoutes = require("./routes/payment.route.js");
const planRoutes = require("./routes/plan.route.js");
const goalRouter = require("./routes/goal.routes.js");
const homeRouter = require("./routes/home.route.js");

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/news", newsRoutes);
app.use("/post", postRoutes);
app.use("/budget", budgetRoutes);
app.use("/report", reportRoutes);
app.use("/ai", aiRouter);
app.use("/notification", notificationRoutes);
app.use("/merchandise", merchandiseRoutes);
app.use("/payment", paymentRoutes);
app.use("/plan", planRoutes);
app.use("/goal", goalRouter);
app.use("/home",homeRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// scheduleDailyDictionary();
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1); // Exit the app
  });
