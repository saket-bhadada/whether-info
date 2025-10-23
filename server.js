require('dotenv').config();
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
    const city = req.body.city;
    const country = req.body.country;
    const apiKey = process.env.API_KEY;
    let locationQuery = city;
    if(country){
        locationQuery += `,${country}`;
    }
    
});