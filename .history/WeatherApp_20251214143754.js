import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


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
  document.querySelector('.city').innerHTML = data.sys.country,
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.description').innerHTML = data.weather[0].description;
  //document.querySelector('.img').src = data.weather[0].main.toLowerCase() + ".png";

  console.log(data);
  console.log(date1);
}

  const today = dayjs();

  const todayFormat = today.add(0, 'days');

  const date1 = todayFormat.format(' MMMM D, ');




  document.querySelector('.todaydate').innerHTML = date1;

searchBtn.addEventListener('click', () => {
weatherApp(searchBox.value);
});

searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    weatherApp(searchBox.value);
    searchBox.value = '';
  }
})

