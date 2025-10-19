const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.querySelector('.error-message');

const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

searchForm.addEventListener('submit', async (e) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if(city){
        await getWeather(city);
    }
});

async function getWeather(city){
    const apiurl
}