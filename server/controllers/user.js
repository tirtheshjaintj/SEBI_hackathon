const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const asyncHandler = require("express-async-handler"); // assuming you installed express-async-handler
const User = require("../models/User.js");
const { encrypt } = require("../utils/aes.js");
const nodemailer = require("nodemailer");

const client = new OAuth2Client(process.env.G_CLIENT_ID);

// Token generator
const getToken = (user, exp = null) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: exp ? exp : "1y" }
  );
};

// Verify Google token
const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.G_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw new Error("Invalid token");
  }
};

// Google sign-in handler
exports.GoogleSignIn = asyncHandler(async (req, res) => {
  const { tokenId } = req.body;

  // console.log(tokenId);
  if (!tokenId) {
    return res.status(400).json({ message: "Token ID is required" });
  }

  const googleUser = await verifyGoogleToken(tokenId);
  // console.log(googleUser);

  const { email, name, sub, picture } = googleUser;

  if (!email || !name || !sub) {
    return res
      .status(400)
      .json({ message: "Missing required Google user fields" });
  }

  let user = await User.findOne({ email }).select("-password").lean();

  if (user) {
    if (!user.gid) {
      user.gid = sub;
      await user.save();
    }

    const token = getToken(user);
    const resUser = await User.findById(user._id).select("-password").lean();

    const payload = encrypt({
      message: "Account already exists, logged in successfully",
      user: resUser,
      token,
    });

    return res.status(200).json({ encrypted: payload });
  }

  // Create new user
  user = await User.create({
    email,
    name,
    avatar: picture,
    gid: sub,
  });

  const token = getToken(user);
  // console.log(encrypt(user));
  return res.status(201).json({
    encrypted: encrypt({
      message: "Account created successfully",
      user: user,
      token,
    }),
  });
});

exports.authCheck = asyncHandler(async (req, res) => {
  try {
    const { encrypted } = req.body;
    if (!encrypted)
      return res.status(400).json({ message: "Encrypted data is required" });
    const token = encrypted;
    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }
      // Find user and exclude password
      const user = await User.findById(decoded.id || decoded._id)
        .select("-password")
        .lean();

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        return res.status(200).json({
          message: "Authorized",
          user: {
            ...user,
            accessToken: token,
          },
        });
      }
    }

    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error during auth check" });
  }
});



exports.sendLoginAlert = async (req, res) => {
  try {
    const { email, name, deviceInfo } = req.body;
    // deviceInfo should include: browser, os, device, ip, location

    if (!email || !deviceInfo) {
      return res.status(400).json({ message: "Email and device info are required" });
    }

    // 1️⃣ Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your SMTP service
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 2️⃣ Prepare email
    const mailOptions = {
      from: `"DhanRakshak🛡️ Security Alert" <${process.env.EMAIL}>`,
      to: email,
      subject: "DhanRakshak🛡️ Security Alert: New Device Login Detected",
      html: `
    <h2>Hi ${name || "User"},</h2>
    <p>We noticed a new login to your account.</p>

    <h3>Login Details:</h3>
    <ul>
      <li><strong>OS:</strong> ${deviceInfo.os || "Unknown"}</li>
      <li><strong>Device:</strong> ${deviceInfo.brand ? `${deviceInfo.brand} ${deviceInfo.model}` : deviceInfo.model || "Unknown"}</li>
      <li><strong>Model ID:</strong> ${deviceInfo.modelId || "Unknown"}</li>
      <li><strong>Manufacturer:</strong> ${deviceInfo.manufacturer || "Unknown"}</li>
      <li><strong>Login Time:</strong> ${new Date().toLocaleString()}</li>
    </ul>
    <p>If this was <strong>you</strong>, no action is required.</p>
    <p>If you <strong>don’t recognize</strong> this activity, please reset your password immediately.</p>
    <p>Stay safe,<br>Your DhanRakshak🛡️ Team</p>
  `,
    };


    // 3️⃣ Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Login alert email sent successfully",
    });
  } catch (error) {
    console.error("Error sending login alert:", error);
    res.status(500).json({
      message: "Failed to send login alert",
      error: error.message,
    });
  }
};