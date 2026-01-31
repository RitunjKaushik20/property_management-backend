const router = require("express").Router();
const controller = require("../controllers/auth.controllers");
const auth = require("../middlewares/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", auth, controller.getProfile);
router.put("/profile", auth, controller.updateProfile);
router.put("/change-password", auth, controller.changePassword);

module.exports = router;


