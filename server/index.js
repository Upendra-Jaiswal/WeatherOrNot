const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const userPreferencesRoutes = require("./routes/userPreferencesRoutes");

const weatherPreferenceRoutes = require("./routes/weatherPreferenceRoutes");
const authenticateToken = require("./middlewares/authMiddleware");

const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const helmet = require("helmet");

const User = require("./models/userModel");

let salt_key = "96434309-7796-489d-8924-ab56988a6076";
let merchant_id = "PGTESTPAYUAT86";

// Middleware
app.use(express.json());
app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "http://127.0.0.1:8000",
          "ws://localhost:42877/",
        ],
      },
    },
  })
);

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/api", authRoutes);

app.use("/api", userPreferencesRoutes);
app.use("/api", weatherPreferenceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
