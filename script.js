const apiKey = 'b567b8bd61aeb4df374fe73c94981d99';
const favorites = [];

document.getElementById('add-city').addEventListener('click', () => {
    const customCity = document.getElementById('custom-city').value;
    if (customCity) {
        getWeather(customCity);
    }
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            if (!favorites.includes(city)) {
                favorites.push(city);
                updateFavorites();
            }
        })
        .catch(error => console.error('Error fetching weather data: ', error));
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

function updateFavorites() {
    const favoritesSection = document.getElementById('favorites');
    favoritesSection.innerHTML = '';
    favorites.forEach(city => {
        const cityElement = document.createElement('div');
        cityElement.textContent = city;
        cityElement.addEventListener('click', () => getWeather(city));
        favoritesSection.appendChild(cityElement);
    });
}

// You can pre-populate favorites with a few cities if you like.
// favorites.push('New York', 'Los Angeles', 'London');
// updateFavorites();
