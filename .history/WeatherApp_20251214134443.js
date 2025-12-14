const APIkey = '84c3820830b89e9c5cca040b57bbbe7a';
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector('.weather');
const searchBtn = document.querySelector('.searchBtn')

async function weatherApp(city) {
  const response = await fetch(APIurl + city + `&appid=${APIkey}`);
  const data = await response.json();
  if (!data.name) {
    return alert("wrong");
  }
  document.querySelector('.country2').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.description').innerHTML = data.weather[0].description;
  console.log(data);
}



searchBtn.addEventListener('click', () => {
weatherApp(searchBox.value);
});

searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    weatherApp(searchBox.value);
  }
})

