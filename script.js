function getWeatherData(location) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3c46ade6b31ba6d2374c0cb0bd151231`
  
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch weather data.');
        }
        return response.json();
      })
      .then((data) => {
        const weatherData = {
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        };
        return weatherData;
      })
      .catch((error) => {
        console.error('Error:', error.message);
        return null;
      });
  }
  
  const weatherForm = document.getElementById('weather-form');
  const locationInput = document.getElementById('location');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const humidityElement = document.getElementById('humidity');
  const windSpeedElement = document.getElementById('wind-speed');
  
  weatherForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const location = locationInput.value;
    if (location) {
      getWeatherData(location)
        .then((weatherData) => {
          if (weatherData) {
            temperatureElement.textContent = `Temperature: ${weatherData.temperature}°C`;
            descriptionElement.textContent = `Description: ${weatherData.description}`;
            humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;
            windSpeedElement.textContent = `Wind Speed: ${weatherData.windSpeed} m/s`;
          }
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }
  });
  