const { model, Schema } = require("mongoose");

const reportSchema = new Schema({
    app_id: {
        type: String,
    },
    phone_number: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String
    }
}, { timestamps: true });

const reportModel = model("report", reportSchema);

module.exports = reportModel;
