const streamifier = require("streamifier");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary.
 * @param {string} localFilepath - The path of the local file to upload.
 * @returns {object|null} - The Cloudinary response object or null on failure.
 */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/**
 * Delete a file from Cloudinary.
 * @param {string} publicId - The public ID of the file to delete.
 * @returns {object} - The Cloudinary response object.
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const res = await cloudinary.uploader.destroy(String(publicId));
    return res;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw new Error(
      "Something went wrong while deleting the file from Cloudinary."
    );
  }
};

/**
 * Extract the public ID from a Cloudinary URL.
 * @param {string} url - The Cloudinary URL of the file.
 * @returns {string} - The public ID of the file.
 */
const publicId = async (url) => {
  try {
    const arr = url.split("/");
    const item = arr[arr.length - 1];
    const arr2 = item.split(".");
    const res = arr2[0];
    return res;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    throw new Error("Something went wrong while extracting the public ID.");
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary, publicId };
