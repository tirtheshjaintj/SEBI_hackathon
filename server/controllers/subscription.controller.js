const expressAsyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");
const Subscription = require("../models/Subscriptions.js");
const User = require("../models/User.js");

const checkoutSubscription = async (req, res) => {
  try {
    const { amount } = req.body;
    // console.log(amount);
    const userId = req.user._id;
    const existingSubscription = await Subscription.findOne({
      uid: userId,
      status: "captured",
    });
    if (existingSubscription)
      return res.status(200).json({
        message: "You already have a subscription",
        isAlreadySubscribed: true,
      });

    if (!amount || amount < 0) {
      return res.status(400).json({ message: "Valid amount is required" });
    }
    const key_secret = process.env.RAZORPAY_API_SECRET;
    const key_id = process.env.RAZORPAY_API_KEY;
    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const receipt = uuidv4();
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: receipt,
      partial_payment: false,
      notes: {
        key1: "Payment for subscription",
      },
    };

    const paymentInit = await instance.orders.create(options);
    if (!paymentInit) {
      res.status(500).json({ message: "Internal server error During Payment" });
    }
    await Subscription.create({
      razorpay_order_id: paymentInit.id,
      receiptId: receipt,
      amount: amount,
      uid: req.user._id,
      status: "created",
    });

    res
      .status(201)
      .json({ message: "Order created successfully", response: paymentInit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error During Payment" });
  }
};

const verifyOrder = expressAsyncHandler(async (req, res) => {
  const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature: signature,
    receiptId,
  } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !signature || !receiptId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const secret = process.env.RAZORPAY_API_SECRET;

  const isValid = validatePaymentVerification(
    { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
    signature,
    secret
  );

  if (!isValid) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  try {
    const subscription = await Subscription.findOneAndUpdate(
      { razorpay_order_id: razorpayOrderId, receiptId: receiptId },
      {
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: signature,
        uid: req.user._id,
        status: "captured",
      },
      {
        new: true,
      }
    );

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await User.findOneAndUpdate(
      { _id: req.user._id },
      { isPremium: true },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      subscription,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = {
  checkoutSubscription,
  verifyOrder,
};
