const container = document.querySelector('.container');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const iconElement = document.querySelector('.icon');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

const apiKey = 'ea365d5b2565fbeaec5687d147e67ac7';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=metric`;
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', handleSearch);
const unitToggle = document.getElementById('unit-toggle');
let unit = 'metric'; // default unit is Celsius


const saveButton = document.querySelector('.save-button');
const favoriteLocationsElement = document.querySelector('.favorite-locations');
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

unitToggle.addEventListener('change', function() {
  if (unitToggle.checked) {
    unit = 'imperial';
    temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
  } else {
    unit = 'metric';
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  }
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=${unit}`;
  displayWeather();
  
});

saveButton.addEventListener('click', () => {
  const locationName = locationElement.textContent;

  // Check if the location is already saved
  const savedLocations = dropdownMenu.querySelectorAll('li');
  const isLocationSaved = Array.from(savedLocations).some((savedLocation) => {
    return savedLocation.textContent === locationName;
  });

  if (!isLocationSaved) {
    const listItem = document.createElement('li');
    listItem.textContent = locationName;
    dropdownMenu.appendChild(listItem);

    listItem.addEventListener('click', () => {
      searchTerm = locationName;
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=${unit}`;
      displayWeather();
      displayForecast();
      dropdownMenu.style.display = 'none';
    });
  }
});

favoriteLocationsElement.addEventListener('click', (event) => {
  const clickedLocation = event.target.textContent;
  searchTerm = clickedLocation;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=${unit}`;
  displayWeather();
  displayForecast();
  dropdownMenu.style.display = 'none';
});


dropdownButton.addEventListener('click', () => {
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});



function displayWeather() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      locationElement.textContent = `${data.name}, ${data.sys.country}`;
      if (unit === 'metric') {
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      } else {
        temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
      }
      descriptionElement.textContent = data.weather[0].description;
      iconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
      humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
      windElement.textContent = `Wind: ${data.wind.speed} m/s`;

      const backgroundElement = document.querySelector('.background');
      backgroundElement.style.backgroundImage = `url('images/${getBackgroundImage(data.weather[0].id)}')`;

      //displayForecast(); // call displayForecast to show 5-day forecast
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.search-input');
  searchTerm = searchInput.value.trim(); // update searchTerm
  if (!searchTerm) {
    return alert('Please enter a city name');
  }

  displayForecast(); // call displayForecast to show 5-day forecast

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=${unit}`;
  displayWeather();

  searchInput.value = '';
}

displayWeather(); // call displayWeather to show default weather and forecast




function getBackgroundImage(weatherCode) {
  if (weatherCode >= 200 && weatherCode < 300) {
    return 'thunderstorm.jpg';
  } else if (weatherCode >= 300 && weatherCode < 600) {
    return 'rainy.jpg';
  } else if (weatherCode >= 600 && weatherCode < 700) {
    return 'snowy.jpg';
  } else if (weatherCode >= 700 && weatherCode < 800) {
    return 'foggy.jpg';
  } else if (weatherCode == 800) {
    return 'sunny.jpg';
  } else if (weatherCode > 800 && weatherCode < 900) {
    return 'cloudy.jpg';
  } else {
    return 'default.jpg';
  }
}

function displayForecast() {
  const forecastElement = document.querySelector('.forecast');
  forecastElement.innerHTML = '';

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${apiKey}&units=${unit}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
      forecastData.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleString('default', { weekday: 'short' });
        let temperature = `${Math.round(item.main.temp)}°C`;
        if (unit === 'imperial') {
          temperature = `${Math.round(item.main.temp)}°F`;
        }
        const iconUrl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
          <div class="forecast-day">${day}</div>
          <div class="forecast-icon"><img src="${iconUrl}" alt="${item.weather[0].description}"></div>
          <div class="forecast-temperature">${temperature}</div>
        `;
        forecastElement.appendChild(forecastItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}