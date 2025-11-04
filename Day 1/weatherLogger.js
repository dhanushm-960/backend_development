const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const myEmitter = new EventEmitter();

myEmitter.on('fetch', (weatherData) => {
  console.log('Event "fetch" was heard! Printing the temperature.');
  console.log(`The current temperature is: ${weatherData.temperature}°C`);
});

function getWeatherDataAndEmitEvent() {
  console.log('Reading the weather file...');
  const filePath = path.join(__dirname, 'weather.json');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Oh no! Could not read the file:', err);
      return; 
    }
    const parsedData = JSON.parse(data);

    myEmitter.emit('fetch', parsedData);
  });
}
getWeatherDataAndEmitEvent();