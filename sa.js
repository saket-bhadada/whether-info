// No body-parser import needed
require('dotenv').config(); 
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000; 

app.use(cors()); 
app.use(express.static('public')); 

// We use app.get()
app.get('/weather', async (req, res) => {
    
    // We read data from req.query
    const city = req.query.city;
    const country = req.query.country;
    
    const apiKey = process.env.API_KEY; 
    
    let locationQuery = city;
    if (country) {
        locationQuery += `,${country}`;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationQuery}&appid=${apiKey}&units=metric`;

    // ... (rest of the try/catch block is the same) ...
    try {
        const weatherResponse = await fetch(apiUrl);
        if (!weatherResponse.ok) {
            return res.status(404).json({ message: 'Location not found' });
        }
        const weatherData = await weatherResponse.json();
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});