import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
 

app.use(cors());   
app.use(express.static('public'));
app.use(bodyParser.json());

// Export the app for Vercel
export default app;

// Start the server locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const country = req.query.country;
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return res.status(500).json({ message: 'API key not configured on server' });
    }
    let locationQuery = city;
    if(country){
        locationQuery += `,${country}`;
    }
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(locationQuery)}&appid=${apiKey}&units=metric`;
    try{
        console.log('Fetching OpenWeather URL:', apiurl);
        const weatherResponse = await fetch(apiurl);
        console.log('OpenWeather status:', weatherResponse.status);
        if(!weatherResponse.ok){
            const errorJson = await weatherResponse.json();
            console.error('OpenWeather error body:', errorJson);
            return res.status(weatherResponse.status).json({message: errorJson.message || `Error fetching weather data`});
        }
        const weatherData = await weatherResponse.json();
        res.json(weatherData);
    }catch(error){
        console.error(`server error`,error);
        res.status(500).json({message:`server error`});
    }
});
