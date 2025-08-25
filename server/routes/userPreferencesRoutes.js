// routes/userPreferencesRoutes.js
const express = require("express");
const {
  setTheme,
  getTheme,
} = require("../controllers/userPreferencesController.js");
const  authMiddleware  = require("../middlewares/authMiddleware.js");
const router = express.Router();

// PUT request to update theme
router.put("/preferences/theme",authMiddleware,  setTheme);

router.get("/preferences/theme",authMiddleware, getTheme);

module.exports = router;
