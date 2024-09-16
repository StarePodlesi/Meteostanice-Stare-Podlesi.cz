const apiKey = 'e351e5d13283470991e5d13283f7098f';  
const stationId = 'IPODLE19';  

function windDirectionFromDegrees(degrees) {
    const directions = ['S', 'SSV', 'SV', 'VSV', 'V', 'VJV', 'JV', 'JJV', 'J', 'JJZ', 'JZ', 'ZJZ', 'Z', 'ZSZ', 'SZ', 'SSZ'];
    return directions[Math.round(degrees / 22.5) % 16];
}

function convertTemperature(tempCelsius, unit) {
    return unit === 'F' ? (tempCelsius * 9/5 + 32).toFixed(1) : tempCelsius.toFixed(1);
}

function convertWindSpeed(speedKmH, unit) {
    return unit === 'mph' ? (speedKmH * 0.621371).toFixed(1) : speedKmH.toFixed(1);
}

function convertPressure(pressureInHpa, unit) {
    switch (unit) {
        case 'mmHg': return (pressureInHpa * 0.75006).toFixed(2);
        case 'inHg': return (pressureInHpa * 0.02953).toFixed(2);
        default: return pressureInHpa.toFixed(2);
    }
}

function convertPrecipitation(precipMm, unit) {
    return unit === 'in' ? (precipMm * 0.0393701).toFixed(2) : precipMm.toFixed(2);
}

function updateWeatherData() {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.observations && data.observations.length > 0) {
                const observation = data.observations[0];
                
                const tempUnit = document.getElementById('temp-unit-select').value;
                const windSpeedUnit = document.getElementById('wind-speed-unit-select').value;
                const windDirUnit = document.getElementById('wind-dir-select').value;
                const pressureUnit = document.getElementById('pressure-unit-select').value;
                const precipUnit = document.getElementById('precip-unit-select').value;

                document.getElementById('teplota').textContent = convertTemperature(observation.metric.temp, tempUnit);
                document.getElementById('temp-unit').textContent = `°${tempUnit}`;

                document.getElementById('vitr').textContent = convertWindSpeed(observation.metric.windSpeed, windSpeedUnit);
                document.getElementById('wind-speed-unit').textContent = windSpeedUnit;

                if (windDirUnit === 'directions') {
                    document.getElementById('smer').textContent = windDirectionFromDegrees(observation.winddir) || '--';
                } else {
                    document.getElementById('smer').textContent = observation.winddir || '--';
                }

                document.getElementById('vlhkost').textContent = observation.humidity || '--';
                document.getElementById('tlak').textContent = convertPressure(observation.metric.pressure, pressureUnit);
                document.getElementById('pressure-unit').textContent = pressureUnit;

                document.getElementById('srazky').textContent = convertPrecipitation(observation.metric.precipTotal, precipUnit);
                document.getElementById('precip-unit').textContent = precipUnit;
            }
        })
        .catch(error => console.error('Chyba při načítání dat z API:', error));
}

setInterval(updateWeatherData, 30000);
document.getElementById('temp-unit-select').addEventListener('change', updateWeatherData);
document.getElementById('wind-speed-unit-select').addEventListener('change', updateWeatherData);
document.getElementById('wind-dir-select').addEventListener('change', updateWeatherData);
document.getElementById('pressure-unit-select').addEventListener('change', updateWeatherData);
document.getElementById('precip-unit-select').addEventListener('change', updateWeatherData);

updateWeatherData();
