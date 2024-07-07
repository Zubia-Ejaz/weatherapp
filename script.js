const apiKey = 'a466f95bcdd8df337a24fd9f9dcf999c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherIconElement = document.getElementById('weatherIcon');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  const location = locationInput.value.trim();
  if (location) {
    fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const temperature = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;

        locationElement.textContent = data.name;
        temperatureElement.textContent = `${temperature}°C`;
        weatherIconElement.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
        descriptionElement.textContent = weatherDescription;
        humidityElement.textContent = `Humidity: ${humidity}%`;
        windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;

        document.body.classList.remove('loading');
      })
      .catch(error => console.error(error));
  }
}
