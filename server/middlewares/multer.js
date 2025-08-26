const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.memoryStorage(); // Store in memory for immediate Cloudinary upload

// Multer file filter for validating image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/bmp",
        "image/tiff",
        "image/tif",
        "image/ico",
        "image/heic",
        "image/heif",
        "image/avif",
        "image/svg+xml",
        "image/eps",
        "application/pdf"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
};

// Multer middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

module.exports = upload;
