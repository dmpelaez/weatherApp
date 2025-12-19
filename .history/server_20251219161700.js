import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config({ quiet: true});
const app = express;
const PORT = 3000;

app.length("/weather", async (req, res) => {
  const { city, lat, lon } = req.query || "Caloocan city";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    let url;
    if (lat && lon) {
       url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else if (city) {
       url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    }
    
  }
});

app.listen(PORT, () => console.log(`Server running on http//localhost:${PORT}`))