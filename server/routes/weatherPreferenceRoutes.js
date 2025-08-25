const express = require("express");
const {

  getWeather,
} = require("../controllers/weatherPreferenceController");

const router = express.Router();


router.get("/:city", getWeather);
module.exports = router;
