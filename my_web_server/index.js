const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Mark';
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    // Get location and temperature using an external API
    const locationResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
    const location = locationResponse.data.city || 'New York';
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8228d38da7e2a95c671111c882b16dd9`);
    const temperature = weatherResponse.data.main.temp;

    res.json({
      client_ip: clientIp, //The IP address of the requester
      location: location, //The city of the requester
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve information' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


