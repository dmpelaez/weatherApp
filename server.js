import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config({ quiet: true});
const app = express();
const PORT = 3000;

app.use(cors());

app.get("/weather", async (req, res) => {
  const { q, city, lat, lon } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    let url;
    if (lat && lon) {
       url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else if (q) {
       url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=metric`;
    } else if(city) {
       url = `https://api.openweathermap.org/data/2.5/weather?city=${city}&appid=${apiKey}&units=metric`;
    } else {
      return res.status(400).json({ error: "Please provide a latitude/longitude or city name"})
    }
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data"})
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))