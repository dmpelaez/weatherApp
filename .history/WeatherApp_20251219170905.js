import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';




const searchBox = document.querySelector('.weather');
const searchBtn = document.querySelector('.searchBtn')

//This is the api to get the whole data of the city/country 
//after searching for it
async function weatherApp(city) {
  const response = await fetch(`/weather?` + `q=${city}`);

  const data = await response.json();
  if (!data.name) {
    return alert("wrong");
  } 
     document.querySelector('.country2').innerHTML = data.name; 
  
  
  document.querySelector('.city').innerHTML = data.sys.country;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.description').innerHTML = data.weather[0].description;
  document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
  document.querySelector('.feelsLike').innerHTML = Math.round(data.main.feels_like) + '°C';
  document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const iconElement = document.querySelector('.img');

  iconElement.src = iconUrl;

//This part is ai generated//
//switch also acts as IF statement where I use the switch 
//to trigger types of icon where CASE is the syntax to meet the specific condition
// and break to stop it and the default shows the design
 switch (iconCode) {

  // ☀️ CLEAR SKY
  case "01d":
    iconElement.style.filter = "brightness(1.25) saturate(1.2)";
    break;
  case "01n":
    iconElement.style.filter = "brightness(0.7) contrast(1.2)";
    break;

  // 🌤️ FEW CLOUDS
  case "02d":
    iconElement.style.filter = "brightness(1.2) contrast(1.05)";
    break;
  case "02n":
    iconElement.style.filter = "brightness(0.75) contrast(1.15)";
    break;

  // ☁️ SCATTERED CLOUDS
  case "03d":
    iconElement.style.filter = "brightness(1.15) contrast(1.05)";
    break;
  case "03n":
    iconElement.style.filter = "brightness(0.8) contrast(1.1)";
    break;

  // 🌥️ BROKEN CLOUDS
  case "04d":
    iconElement.style.filter = "brightness(1.1) saturate(1.05)";
    break;
  case "04n":
    iconElement.style.filter = "brightness(0.7) contrast(1.2) saturate(0.9)";
    break;

  // 🌧️ SHOWER RAIN
  case "09d":
    iconElement.style.filter = "brightness(1.1) saturate(1.1)";
    break;
  case "09n":
    iconElement.style.filter = "brightness(0.75) contrast(1.15)";
    break;

  // 🌦️ RAIN
  case "10d":
    iconElement.style.filter = "brightness(1.15) saturate(1.1)";
    break;
  case "10n":
    iconElement.style.filter = "brightness(0.75) contrast(1.15)";
    break;

  // 🌩️ THUNDERSTORM
  case "11d":
    iconElement.style.filter = "contrast(1.2) brightness(0.95)";
    break;
  case "11n":
    iconElement.style.filter = "contrast(1.25) brightness(0.85)";
    break;

  // ❄️ SNOW
  case "13d":
    iconElement.style.filter = "brightness(1.2) saturate(0.9)";
    break;
  case "13n":
    iconElement.style.filter = "brightness(0.85) saturate(0.8)";
    break;

  // 🌫️ MIST
  case "50d":
    iconElement.style.filter = "grayscale(0.3) brightness(1.1)";
    break;
  case "50n":
    iconElement.style.filter = "grayscale(0.4) brightness(0.9)";
    break;

  // DEFAULT
  default:
    iconElement.style.filter = "none";
}

  

  console.log(data);
  console.log(date1);
}


//This function is focus on fetching my current location and displaying it as default 
//where I put this function on navigator.geolocation.getcurrentposition
async function fetchWeather(lat, lon) {
  const response = await fetch(`http://localhost:5501/weather?lat=14.646&lon=120.991`);
  const data3 = await response.json();
   document.querySelector('.country2').innerHTML = data3.name;
   /* 
  document.querySelector('.city').innerHTML = data3.sys.country;
  */
  document.querySelector('.temp').innerHTML = Math.round(data3.main.temp) + '°C';
  document.querySelector('.description').innerHTML = data3.weather[0].description;
  document.querySelector('.humidity').innerHTML = data3.main.humidity + "%";
  document.querySelector('.feelsLike').innerHTML = Math.round(data3.main.feels_like) + '°C';
  document.querySelector('.wind').innerHTML = data3.wind.speed + "km/h";

  if (!searchBox.value) {
     const iconCode = data3.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  
   
   document.querySelector('.img').src = iconUrl;
  }
  

  console.log(data3);
}

//This is a permission where a user who visited the website once don't need 
// to request again if they visit again
console.log(navigator.permissions.query({name: 'geolocation'})
.then (function(result) {
  if (result.state === 'granted') {

  } else if (result.state === 'prompt') {

  } else if (result.state === 'denied') {

  }
  console.log(result.state);
})
);

  //I use this to get my current location or the users of the website
  console.log(navigator.geolocation.getCurrentPosition(position => {
    fetchWeather(position.coords.latitude, position.coords.longitude)

  }));
  


//This is an imported ecmascript where I use it to get the current day and display it
  const today = dayjs();

  const todayFormat = today.add(0, 'days');

  const date1 = todayFormat.format(' MMMM D,');

  const date2 = todayFormat.format('dddd');

 document.querySelector('.todaydate').innerHTML = date1;
 document.querySelector('.dateToday').innerHTML = date2;

//This is the search btn where everytime i click it
//the weatherApp function with searchBox.value will be trigger
// or the parameter 
searchBtn.addEventListener('click', () => {
weatherApp(searchBox.value);
});

//This is the event.key version to search by just entering after 
//putting the country in the search bar
searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    weatherApp(searchBox.value);
    searchBox.value = '';
  }
})

