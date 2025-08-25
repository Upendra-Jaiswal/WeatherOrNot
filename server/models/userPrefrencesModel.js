// models/userPreferencesModel.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userPreferencesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // ⚡ references the User model
      required: true,
      unique: true, // each user has only one preferences document
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    favoriteCities: [
      {
        type: String, // city name
      },
    ],
    unit: {
      type: String,
      enum: ["celsius", "fahrenheit"],
      default: "celsius",
    },
    defaultCity: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const UserPreferences = mongoose.model(
  "UserPreferences",
  userPreferencesSchema
);

module.exports = UserPreferences;
