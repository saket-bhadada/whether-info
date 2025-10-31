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
    e.preventDefault();
    const city = cityInput.value.trim();
    const country = document.getElementById('country-input').value.trim();
    if(city){
        await getWeather(city,country);
    }
});

async function getWeather(city,country){
    const apiurl = `http://localhost:3000/weather?city=${city}`;
    if(country){
        apiurl += `&country=${country}`;
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
        displayWeather(data);
     }catch(error){
        console.error('error fetching wether',error);
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
     }
     displayWeather(data);
}

function displayWeather(data){
    const city = data.name;
    const country = data.sys.country;
    const temp = `${Math.round(data.main.temp)}°C`;
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const hum = `Humidity: ${data.main.humidity}%`;
    const windSpeed = `Wind: ${data.wind.speed} m/s`;

    const iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;

    cityName.textContent = `${city}, ${country}`;
    temperature.textContent = temp;
    description.textContent = desc;
    humidity.textContent = hum;
    wind.textContent = windSpeed;
    weatherIcon.src = iconURL;

    weatherDisplay.style.display = 'block';
    errorMessage.style.display = 'none';
}