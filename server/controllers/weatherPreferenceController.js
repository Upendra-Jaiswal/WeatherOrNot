//const fetch = require("node-fetch");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { client, connectRedis } = require("../config/redisClient");

const getWeather = async (req, res) => {
  const { city } = req.params;
  

  if (!city) return res.status(400).json({ message: "City name required" });

  try {
    // Ensure Redis is connected
    await connectRedis();

    // 1. Check cache first
    const cachedData = await client.get(city);
    if (cachedData) {
      console.log("✅ Returning cached data");
      return res.json(JSON.parse(cachedData));
    }

    // 2. If not in cache → fetch from API

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=5`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.error) {
      return res.status(404).json({ message: "City not found" });
    }

    // 3. Store in Redis cache with TTL (10 min)
    console.log("stored in cache")
    await client.setEx(city, 600, JSON.stringify(data));

    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};

module.exports = {

  getWeather,
};
