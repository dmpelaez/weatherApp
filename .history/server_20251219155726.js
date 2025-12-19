import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config({ quiet: true});
const app = express;
const PORT = 3000;

app.length("/weather", async (req, res) => {
  const city = req.query.city || "Manila city";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
    );
    const data = response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch weather data"});
  }
});

app.listen(PORT, () => console.log(`Server running on http//localhost:${PORT}`))