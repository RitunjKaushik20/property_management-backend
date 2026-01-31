const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("../controllers/lead.controller");

router.post("/", auth, role("buyer"), controller.createLead);
router.get("/", auth, role("admin"), controller.getAllLeads);
router.get("/agent", auth, role("agent"), controller.getAgentLeads);
router.get("/buyer", auth, role("buyer"), controller.getBuyerLeads);
router.get("/:id", auth, controller.getLeadById);
router.put("/:id", auth, controller.updateLead);
router.delete("/:id", auth, role("admin"), controller.deleteLead);

module.exports = router;
