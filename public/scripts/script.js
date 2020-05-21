const getElement = (selector) => document.querySelector(selector);

const addSwitchMechanism = () => {
  const $daily = getElement('#daily');
  const $hourly = getElement('#hourly');
  $daily.addEventListener('click', () => {
    $daily.classList.add('active');
    $hourly.classList.remove('active');
    getElement('.daily-details').classList.remove('hidden');
    getElement('.hourly-details').classList.add('hidden');
  });

  $hourly.addEventListener('click', () => {
    $hourly.classList.add('active');
    $daily.classList.remove('active');
    getElement('.hourly-details').classList.remove('hidden');
    getElement('.daily-details').classList.add('hidden');
  });
};

const renderCurrentDetails = (currently) => {
  const keys = {
    temperature: 'Temperature (in celsius)',
    humidity: 'Humidity',
    ozone: 'Ozone',
    cloudCover: 'Cloud cover',
    precipProbability: 'Rainfall Probability',
    precipIntensity: 'Rainfall Intensity',
    windSpeed: 'Wind Speed (in km/h)',
    pressure: 'Pressure (in Pascal)',
  };
  const detailsToShow = Object.keys(keys);
  const htmlData = detailsToShow.map((key) => {
    return `<div>${keys[key]}: <b>${currently[key]}</b  ></div>`;
  });
  getElement('.currently-details').innerHTML = htmlData.join('');
};

const renderDailyDetails = (daily, timezone) => {
  getElement('.summary').innerText = `Summary of the Week: ${daily.summary}`;
  const htmlDailyData = daily.data.map((dayData) => {
    return `<div class="day-details card" >
      <div class="date">${new Date(dayData.time).toDateString({timezone})}</div>
      <div class="daily-summary"> Summary: ${dayData.summary} </div>
      <div class="day-data">
        <div>Min Temp(in celsius): ${dayData.temperatureHigh}</div>
        <div>Max Temp(in celsius): ${dayData.temperatureLow}</div>
        <div>Sunrise: 
          ${new Date(dayData.sunriseTime).toLocaleTimeString({timezone})}
        </div>
        <div>Sunset: 
        ${new Date(dayData.sunsetTime).toLocaleTimeString({timezone})}
        </div>
        <div>Humidity:${dayData.humidity}</div>
        <div>Ozone: ${dayData.ozone}</div>
        <div>Pressure: ${dayData.pressure}</div>
        <div>Wind Speed: ${dayData.windSpeed}</div>
      </div>
    </div>`;
  });
  getElement('#daily-data').innerHTML = htmlDailyData.join('');
};
const renderHourlyDetails = (hourly, timezone) => {
  const $summary = getElement('#hourly-summary');
  $summary.innerText = `Summary of the Day: ${hourly.summary}`;
  const htmlHourlyData = hourly.data.map((hourlyData) => {
    return `<div class="hourly-data card">
  <div class="hour-details">
    <div class="time">Time: 
      ${new Date(hourlyData.time).toLocaleTimeString({timezone})}
    </div>
    <div class="hourly-summary">Summary: ${hourlyData.summary}</div>
    <div class="hour-data">
      <div>Temperature: ${hourlyData.temperature}</div>
      <div>Humidity:${hourlyData.humidity}</div>
      <div>Ozone: ${hourlyData.ozone}</div>
      <div>Pressure: ${hourlyData.pressure}</div>
      <div>Wind Speed: ${hourlyData.windSpeed}</div>
    </div>
  </div>
</div>`;
  });
  getElement('#hourly-data').innerHTML = htmlHourlyData.join('');
};

const renderWeatherDetails = (weatherData) => {
  getElement('.location').innerText = weatherData.location;
  renderCurrentDetails(weatherData.currently, weatherData.timezone);
  renderDailyDetails(weatherData.daily, weatherData.timezone);
  renderHourlyDetails(weatherData.hourly, weatherData.timezone);
};

const main = function () {
  addSwitchMechanism();
  fetch('/getWeatherDetails', {method: 'POST'})
    .then((res) => res.json())
    .then((weatherData) => {
      renderWeatherDetails(weatherData);
    });
};

window.onload = main;
