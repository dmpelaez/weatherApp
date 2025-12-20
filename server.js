import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";
import { fileURLToPath }  from 'url';
import path from "path";




//The library dotenv.config is a way to load the contents
//inside the .env file using process.env(name of the variable)
dotenv.config({ quiet: true});

//express() is a framework to use 
//so all the process in the systems request and respond is much faster and cleaner
const app = express();
const PORT = 3000;

//fileURLToPath is a method of url to create a string file
//for the current file I'm looking which is server.js
//using import.meta.url and it will result 
//to generate C:/Users/Delmar Pelaez/Desktop/Weather App/server.js
const __filename = fileURLToPath(import.meta.url);
//now that I have the URL I need to delete the server.js in 
//that file path string using dirname
//which result in C:/Users/Delmar Pelaez/Desktop/Weather App
const __dirname = path.dirname(__filename); 
//after that I combined using path.join, the string file and and the string 
//'public' that has the same name for the folder where the files of frontend
//which will result in C:/Users/Delmar Pelaez/Desktop/Weather App/public.
//after that I use express.static to look for each content of the folder
//and use it to request for service and thus app.use
//will send all the request to the browser
app.use(express.static(path.join(__dirname, 'public')));

//allowed everything that can cause a security warning
app.use(cors());
//get everything inside the content of app.get
app.get("/weather", async (req, res) => {
  //async is a method to use to wait for all
  //the request/fetched datas to generate//
  //destrcuting method as a way to multiple parameters
  //inside the req and putting query in the 
  //req.query means we are looking for the object
  //of these parameters in the http
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