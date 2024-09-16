const apiKey = '0f95fd0f58a2451a95fd0f58a2a51a75';  
const stationId = 'IPODLE19';  

let unitSystem = 'm';  

function getWindDirection(degree) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.floor((degree + 22.5) / 45) % 8;
    return directions[index];
}

function convertPressure(pressure, unit) {
    return unit === 'imperial' ? (pressure * 0.02953).toFixed(2) : pressure.toFixed(1);
}

function convertRain(rainfall, unit) {
    return unit === 'imperial' ? (rainfall * 0.0393701).toFixed(2) : rainfall.toFixed(1);
}

function updateWeatherData() {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=${unitSystem}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const observation = data.observations[0];

            const temperature = observation.metric.temp;
            const humidity = observation.humidity;
            const windSpeed = observation.metric.windSpeed;
            const windDirection = observation.winddir;
            const pressure = observation.metric.pressure;
            const rainfall = observation.metric.precipTotal;

            document.getElementById('temperature').textContent = `${temperature.toFixed(1)} °${unitSystem === 'm' ? 'C' : 'F'}`;
            document.getElementById('humidity').textContent = `${humidity} %`;
            document.getElementById('windSpeed').textContent = `${windSpeed.toFixed(1)} ${unitSystem === 'm' ? 'm/s' : 'mph'}`;
            document.getElementById('windDirection').textContent = getWindDirection(windDirection);
            document.getElementById('pressure').textContent = `${convertPressure(pressure, unitSystem === 'm' ? 'metric' : 'imperial')} ${unitSystem === 'm' ? 'hPa' : 'inHg'}`;
            document.getElementById('rainfall').textContent = `${convertRain(rainfall, unitSystem === 'm' ? 'metric' : 'imperial')} ${unitSystem === 'm' ? 'mm' : 'in'}`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

document.getElementById('unitSelect').addEventListener('change', function () {
    unitSystem = this.value === 'metric' ? 'm' : 'e';
    updateWeatherData();
});

updateWeatherData();
setInterval(updateWeatherData, 30000);
