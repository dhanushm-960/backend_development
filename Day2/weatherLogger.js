const EventEmitter = require('events');
const { once } = require('events');
const fs = require('fs').promises;
const path = require('path');

const myEmitter = new EventEmitter();

function fetchAndEmitWeather() {
  console.log('Starting to fetch weather data...');
  setTimeout(async () => {
    try {
      const filePath = path.join(__dirname, 'weather.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const weatherData = JSON.parse(data);
      console.log('Data fetched! Emitting event...');
      myEmitter.emit('weatherFetched', weatherData);
    } catch (error) {
      myEmitter.emit('error', error);
    }
  }, 2000);
}

async function displayWeather() {
  try {
    console.log('Waiting for weather data event...');
    const [weatherData] = await once(myEmitter, 'weatherFetched');
    console.log('\n--- Weather Report ---');
    console.log(`City: ${weatherData.city}`);
    console.log(`Temperature: ${weatherData.temperature}°C`);
    console.log(`Condition: ${weatherData.condition}`);
    console.log('----------------------');
  } catch (error) {
    console.error('Failed to get and display weather:', error);
  }
}

displayWeather(); 
fetchAndEmitWeather();