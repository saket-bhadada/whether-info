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
        await getWeather(city,country);
    }
});

async function getWeather(city,country){
    const apiurl = `http://localhost:3000/weather?city=${city}`;
    if(country){
        apiurl += `$country=${country}`;
     }
     try{
        weatherDisplay.style.display = 'none';
        errorMessage.style.display = 'none';
        const response = await fetch(apiurl);
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || `location not found`);
        }
        const data = await response.json();
     }catch(error){}
}

function displayWeather(data){
    const city = data.name;
    const iconcode = data.weather[0].icon;
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidityValue = data.main.humidity;
    const windSpeed = data.wind.speed;

    city 
}