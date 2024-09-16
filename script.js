const apiKey = 0f95fd0f58a2451a95fd0f58a2a51a75;  
const stationId = IPODLE19;  

let tempUnit = 'metric';  
let windUnit = 'metric';  
let pressureUnit = 'hPa'; 
let rainUnit = 'mm';      

function getWindDirection(degree) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.floor((degree + 22.5) / 45) % 8;
    return directions[index];
}

function convertPressure(pressure) {
    switch (pressureUnit) {
        case 'mmHg':
            return (pressure * 0.75006).toFixed(2);  
        case 'inHg':
            return (pressure * 0.02953).toFixed(2);  
        default:
            return pressure.toFixed(1);  
    }
}

function convertRain(rainfall) {
    return rainUnit === 'in' ? (rainfall * 0.0393701).toFixed(2) : rainfall.toFixed(1);
}

function updateWeatherData() {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=${tempUnit}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const observation = data.observations[0];

            const temperature = observation[tempUnit === 'metric' ? 'metric' : 'imperial'].temp;
            const humidity = observation.humidity;
            const windSpeed = observation[tempUnit === 'metric' ? 'metric' : 'imperial'].windSpeed;
            const windDirection = observation.winddir;
            const pressure = observation[tempUnit === 'metric' ? 'metric' : 'imperial'].pressure;
            const rainfall = observation[tempUnit === 'metric' ? 'metric' : 'imperial'].precipTotal;

            document.getElementById('temperature').textContent = `${temperature.toFixed(1)} °${tempUnit === 'metric' ? 'C' : 'F'}`;
            document.getElementById('humidity').textContent = `${humidity} %`;
            document.getElementById('windSpeed').textContent = `${windSpeed.toFixed(1)} ${windUnit === 'metric' ? 'm/s' : 'mph'}`;
            document.getElementById('windDirection').textContent = getWindDirection(observation.winddir);
            document.getElementById('pressure').textContent = `${convertPressure(pressure)} ${pressureUnit}`;
            document.getElementById('rainfall').textContent = `${convertRain(rainfall)} ${rainUnit}`;
        })
        .catch(error => console.error('Chyba při načítání dat:', error));
}

document.getElementById('tempSelect').addEventListener('change', function () {
    tempUnit = this.value;
    updateWeatherData();
});

document.getElementById('windSelect').addEventListener('change', function () {
    windUnit = this.value;
    updateWeatherData();
});

document.getElementById('pressureSelect').addEventListener('change', function () {
    pressureUnit = this.value;
    updateWeatherData();
});

document.getElementById('rainSelect').addEventListener('change', function () {
    rainUnit = this.value;
    updateWeatherData();
});

updateWeatherData();
setInterval(updateWeatherData, 30000);
