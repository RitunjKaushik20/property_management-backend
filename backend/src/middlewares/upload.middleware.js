const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "property-management",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }]
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
