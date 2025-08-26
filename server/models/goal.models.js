const { Schema, model, Types } = require("mongoose");

const goalSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    targetAmount: {
        type: Number,
        required: true,
        min: 0
    },
    currentAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    targetDays: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    category: {
        type: String,
        enum: ["education", "travel", "emergency", "investment", "other"],
        default: "other"
    },
    priority: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    status: {
        type: String,
        enum: ["active", "paused", "completed", "cancelled"],
        default: "active"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// 📌 Virtual: targetDate = createdAt + targetDays
goalSchema.virtual("targetDate").get(function () {
    if (!this.createdAt || !this.targetDays) return null;
    const end = new Date(this.createdAt);
    end.setDate(end.getDate() + this.targetDays);
    return end;
});

// 📌 Virtual: type (short-term or long-term)
goalSchema.virtual("type").get(function () {
    return this.targetDays <= 730 ? "short-term" : "long-term";
});

// 📌 Virtual: progressPercent (0-100)
goalSchema.virtual("progressPercent").get(function () {
    if (!this.targetAmount || this.targetAmount === 0) return 0;
    return Math.min((this.currentAmount / this.targetAmount) * 100, 100);
});

// 📌 Virtual: daysRemaining
goalSchema.virtual("daysRemaining").get(function () {
    const now = new Date();
    const targetDate = new Date(this.createdAt);
    targetDate.setDate(targetDate.getDate() + this.targetDays);
    const diffTime = targetDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 0); // never negative
});

// 📌 Virtual: isOverdue
goalSchema.virtual("isOverdue").get(function () {
    const targetDate = new Date(this.createdAt);
    targetDate.setDate(targetDate.getDate() + this.targetDays);
    return new Date() > targetDate && this.status !== "completed";
});

// 📌 Auto-complete status when saving if currentAmount >= targetAmount
goalSchema.pre("save", function (next) {
    if (this.currentAmount >= this.targetAmount && this.status !== "completed") {
        this.status = "completed";
    }
    next();
});

const GoalModel = model("Goal", goalSchema);

module.exports = GoalModel;
