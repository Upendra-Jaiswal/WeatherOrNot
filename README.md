# 🌦️ Weather & Theme Preference App

A full-stack MERN application that provides weather forecasts with Redis caching and supports user theme preferences (light/dark mode).

## 🚀 Setup Instructions

### Prerequisites

- Node.js

- MongoDB

- npm or yarn

  ### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run start
```

### Environment Variables

Create a .env file in the backend directory and configure the following:

```bash
JWT_SECRET=<jwt_secret>
MONGODB_URI_CLOUD=<mongodb+srv://developeruj:<password>@cluster0.eaqkprw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0>
BACKEND=<http://localhost:3001>
ORIGIN=<http://localhost:3000>
WEATHER_API_KEY=<your-weatherapi-key>
REDIS_HOST=<localhost>
REDIS_PORT=<6379>


```

## 📌 Assumptions Made

Each user can have only one theme preference stored in the database.
Weather data is cached in Redis for 10 minutes to reduce repeated API calls.
Only valid theme values (light or dark) are allowed.
Users are expected to provide a valid city name for weather information.
User authentication middleware (authMiddleware) provides the user’s \_id for updating and fetching preferences.

## ⚠️ Known Limitations

The weather API is not rate-limited; repeated requests may hit API limits.
Redis must be running locally or properly configured for production.
Currently supports only light and dark themes.
Some features are disabled (Beta):
Choosing temperature units (°C / °F)
Setting a default city
Enabling daily weather notifications
Error handling for network/API failures is basic.

## 🌱 Future Improvements

Enable temperature unit selection (Celsius/Fahrenheit).
Allow users to set a default city for quick access.
Implement daily weather notifications.
Add system theme detection to automatically apply dark/light mode.
Expand theme options beyond just “light” and “dark”.
Add rate-limiting to prevent abuse of the weather API.
Improve error handling and provide user-friendly messages.
Add unit and integration tests for reliability.
Store weather history for analytics and insights.
Deploy using Docker with separate Redis and MongoDB containers.
