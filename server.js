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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const country = req.query.country;
    const apiKey = process.env.API_KEY;
    let locationQuery = city;
    if(country){
        locationQuery += `,${country}`;
    }
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${locationQuery}&appid=${apiKey}`;
    try{
        const weatherResponse = await fetch(apiurl);
        if(!weatherResponse.ok){
            return res.status(weatherResponse.status).json({message:`location not found`});
        }
        const weatherData = await weatherResponse.json();
        res.json(weatherData);
    }catch(error){
        console.error(`server error`,error);
        res.status(500).json({message:`server error`});
    }
});