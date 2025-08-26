const { decrypt } = require("../utils/aes");

const decryptBodyMiddleware = (req, res, next) => {
  try {
    if (req.body?.encrypted) {
      const decryptedData = decrypt(req.body.encrypted);
      req.body = decryptedData;
    }
    next();
  } catch (err) {
    console.error("Decryption failed:", err.message);
    return res.status(400).json({ message: "Invalid encrypted data" });
  }
};

module.exports = decryptBodyMiddleware;
