const express = require("express");
const router = express.Router();
const executeController = require("./controllers/executeController");

// say hello from root i.e. /api/
router.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Route to execute code
// /api/execute
router.post("/execute", executeController.executeCode);
router.post("/executorcheck", executeController.executeCheck);

module.exports = router;
