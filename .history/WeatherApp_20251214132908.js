const APIkey = '84c3820830b89e9c5cca040b57bbbe7a';
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Philippines";
const city = document.querySelector('.weather');

async function weatherApp(name) {
  const response = await fetch(APIurl + name `&appid=${APIkey}`);
  const data = await response.json();
  if (!data.name) {
    return alert("wrong");
  }
  document.querySelector('.country2').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.description').innerHTML = data.weather[0].description;
  console.log(data);
}


document.querySelector('.searchBtn')
.addEventListener('click', () => {

})
weatherApp();
