const APIkey = '84c3820830b89e9c5cca040b57bbbe7a';
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=switzerland";


async function weatherApp() {
  const response = await fetch(APIurl + `&appid=${APIkey}`);
  const data = await response.json();

  document.querySelector('.country2').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.description').innerHTML = data.weather[0].description;
  console.log(data);
}

weatherApp();