const { createClient } = require("redis");

// const client = createClient();

const client = createClient({
  url: "redis://127.0.0.1:6379"  // adjust if needed
});

client.on("error", (err) => console.error("❌ Redis Client Error:", err));

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
    console.log("✅ Redis connected");
  }
}

module.exports = { client, connectRedis };
