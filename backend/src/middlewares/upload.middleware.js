const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../services/cloudinary");

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

console.log("Cloudinary configured:", isCloudinaryConfigured());

let upload;
if (isCloudinaryConfigured()) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "property-management",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });
  upload = multer({ storage: storage });
} else {
  console.warn("⚠️ Cloudinary not configured - using memory storage");
  // Fallback to memory storage if Cloudinary is not configured
  const memoryStorage = multer.memoryStorage();
  upload = multer({ 
    storage: memoryStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });
}

module.exports = upload;

