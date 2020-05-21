const express = require('express');
const app = express();
const data = require('./src/weatherDetails.json');

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.post('/getWeatherDetails', (req, res) => {
  res.send(data);
});

app.listen(port, () => console.log(`server is on ${port}`));
