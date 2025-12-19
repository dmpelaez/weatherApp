import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config({ quiet: true});
const app = express();
const PORT = 3000;

app.use(cors());

app.get("/weather", async (req, res) => {
  const { city, lat, lon } = req.query || "Caloocan city";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    let url;
    if (lat && lon) {
       url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else if (city) {
       url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else {
      return res.status(400).json({ error: "Please provide a latitude/longitude or city name"})
    }
    const response = await fetch(url);
    const data = response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data"})
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))