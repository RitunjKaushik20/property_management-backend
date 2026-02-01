const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/property.controller");
const upload = require("../middlewares/upload.middleware");

router.post("/", auth, upload.array("images"), controller.addProperty);
router.get("/", controller.getProperties);
router.get("/my-properties", auth, controller.getMyProperties);
router.get("/:id", controller.getPropertyById);
router.put("/:id", auth, upload.array("images"), controller.updateProperty);
router.delete("/:id", auth, controller.deleteProperty);

module.exports = router;
