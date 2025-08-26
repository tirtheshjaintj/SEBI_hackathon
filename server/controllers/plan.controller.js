const Plan = require("../models/Plans"); // adjust path as needed

const createNewPlan = async (req, res) => {
  try {
    const { name, description, price, duration, status } = req.body;

    if (!name || !description || !price || !duration || !status) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newPlan = new Plan({
      name,
      description,
      price,
      duration,
      status,
    });

    await newPlan.save();

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      plan: newPlan,
    });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createNewPlan };
