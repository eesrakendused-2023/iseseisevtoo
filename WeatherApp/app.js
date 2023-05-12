const container = document.querySelector('.container');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const iconElement = document.querySelector('.icon');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

const apiKey = 'ea365d5b2565fbeaec5687d147e67ac7';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=metric`;

function displayWeather() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      locationElement.textContent = `${data.name}, ${data.sys.country}`;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
      iconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
      humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
      windElement.textContent = `Wind: ${data.wind.speed} m/s`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.search-input');
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    return alert('Please enter a city name');
  }
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`;
  displayWeather();
  searchInput.value = '';
}

displayWeather();

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', handleSearch);
