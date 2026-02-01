const { cloudinary } = require("../services/cloudinary");
const prisma = require("../services/prisma");

// Helper function to sanitize text fields for multipart/form-data
const sanitizeText = (text) => {
  if (typeof text !== 'string') return text;
  
  // Replace various newline formats with standard \n
  let sanitized = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n'); // Max 2 consecutive newlines
  
  // Trim each line
  sanitized = sanitized
    .split('\n')
    .map(line => line.trim())
    .join('\n');
  
  return sanitized.trim();
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: { owner: true }
    });
    res.json(properties);
  } catch (error) {
    console.error("GetProperties error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      area,
      yearBuilt,
      parking,
      features,
      images
    } = req.body;

    // Sanitize text fields to handle newlines and special characters
    const sanitizedDescription = sanitizeText(description);
    const sanitizedTitle = sanitizeText(title);
    const sanitizedLocation = sanitizeText(location);
    const sanitizedParking = sanitizeText(parking);

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {

        if (file.buffer) {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "property-management" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });
          imageUrls.push(result.secure_url);

          imageUrls.push(file.path);
        }
      }
    }


    if (images && typeof images === 'string') {
      try {
        const parsedImages = JSON.parse(images);
        if (Array.isArray(parsedImages)) {
          imageUrls = [...imageUrls, ...parsedImages];
        }
      } catch (e) {

        imageUrls.push(images);
      }
    }

    let featuresArray = [];
    if (features) {
      if (typeof features === 'string') {
        try {
          featuresArray = JSON.parse(features);
        } catch (e) {
          featuresArray = features.split(',').map(f => f.trim()).filter(Boolean);
        }
      } else if (Array.isArray(features)) {
        featuresArray = features;
      }
    }

    const property = await prisma.property.create({
      data: {
        title: sanitizedTitle || title,
        description: sanitizedDescription || description,
        price: parseFloat(price),
        location: sanitizedLocation || location,
        type: type || "For Sale",
        bedrooms: parseInt(bedrooms) || 0,
        bathrooms: parseInt(bathrooms) || 0,
        area: parseFloat(area) || 0,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        parking: sanitizedParking || parking || null,
        features: featuresArray,
        images: imageUrls,
        ownerId: req.user.id
      }
    });

    res.json(property);
  } catch (error) {
    console.error("AddProperty error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.updateProperty = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id }
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.ownerId !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    const {
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      area,
      yearBuilt,
      parking,
      features,
      images,
      existingImages,
      imagesToDelete
    } = req.body;

    // Sanitize text fields to handle newlines and special characters
    const sanitizedDescription = sanitizeText(description);
    const sanitizedTitle = sanitizeText(title);
    const sanitizedLocation = sanitizeText(location);
    const sanitizedParking = sanitizeText(parking);

    let imageUrls = [];

    // Handle existing images that were not deleted
    if (existingImages) {
      try {
        const parsedExisting = JSON.parse(existingImages);
        if (Array.isArray(parsedExisting)) {
          imageUrls = parsedExisting;
        }
      } catch (e) {
        console.error('Error parsing existingImages:', e);
      }
    }

    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (file.buffer) {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "property-management" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });
          imageUrls.push(result.secure_url);
        } else if (file.path) {
          imageUrls.push(file.path);
        }
      }
    }

    // Handle features
    let featuresArray = [];
    if (features) {
      if (typeof features === 'string') {
        try {
          featuresArray = JSON.parse(features);
        } catch (e) {
          featuresArray = features.split(',').map(f => f.trim()).filter(Boolean);
        }
      } else if (Array.isArray(features)) {
        featuresArray = features;
      }
    }

    const updated = await prisma.property.update({
      where: { id: req.params.id },
      data: {
        title: (sanitizedTitle || title) || property.title,
        description: (sanitizedDescription || description) || property.description,
        price: price ? parseFloat(price) : property.price,
        location: (sanitizedLocation || location) || property.location,
        type: type || property.type,
        bedrooms: bedrooms ? parseInt(bedrooms) : property.bedrooms,
        bathrooms: bathrooms ? parseInt(bathrooms) : property.bathrooms,
        area: area ? parseFloat(area) : property.area,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : property.yearBuilt,
        parking: (sanitizedParking || parking) || property.parking,
        features: featuresArray.length > 0 ? featuresArray : property.features,
        images: imageUrls.length > 0 ? imageUrls : property.images,
      }
    });

    res.json(updated);
  } catch (error) {
    console.error("UpdateProperty error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id }
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.ownerId !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await prisma.property.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("DeleteProperty error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: { owner: true }
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Increment views count
    await prisma.property.update({
      where: { id: req.params.id },
      data: { views: (property.views || 0) + 1 }
    });

    res.json(property);
  } catch (error) {
    console.error("GetPropertyById error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: { ownerId: req.user.id },
      include: { owner: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(properties);
  } catch (error) {
    console.error("GetMyProperties error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
