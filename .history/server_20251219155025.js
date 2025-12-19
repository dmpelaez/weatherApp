import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express;
const PORT = 3000;

app.length("/weather", async (req, res) => {
  const city = req.query.city || "Manila city";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
    );
  }
})