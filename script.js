const apiKey = 'e351e5d13283470991e5d13283f7098f';  
const stationId = 'IPODLE19';  

function windDirectionFromDegrees(degrees) {
    const directions = ['S', 'SSV', 'SV', 'VSV', 'V', 'VJV', 'JV', 'JJV', 'J', 'JJZ', 'JZ', 'ZJZ', 'Z', 'ZSZ', 'SZ', 'SSZ'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

function convertTemperature(tempCelsius, unit) {
    if (unit === 'F') {
        return (tempCelsius * 9/5 + 32).toFixed(1);  
    }
    return tempCelsius.toFixed(1);  
}

function convertWindSpeed(speedKmH, unit) {
    if (unit === 'mph') {
        return (speedKmH * 0.621371).toFixed(1);  
    }
    return speedKmH.toFixed(1);  
}

function convertPressure(pressureInHpa, unit) {
    switch (unit) {
        case 'mmHg':
            return (pressureInHpa * 0.75006).toFixed(2);  
        case 'inHg':
            return (pressureInHpa * 0.02953).toFixed(2);  
        default:
            return pressureInHpa.toFixed(2);  
    }
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

                const tempInSelectedUnit = convertTemperature(observation.metric.temp, tempUnit);
                document.getElementById('teplota').textContent = tempInSelectedUnit;
                document.getElementById('temp-unit').textContent = `°${tempUnit}`;

                const windSpeedInSelectedUnit = convertWindSpeed(observation.metric.windSpeed, windSpeedUnit);
                document.getElementById('vitr').textContent = windSpeedInSelectedUnit;
                document.getElementById('wind-speed-unit').textContent = windSpeedUnit;

                if (windDirUnit === 'directions') {
                    const windDirection = windDirectionFromDegrees(observation.winddir);
                    document.getElementById('smer').textContent = windDirection || '--';
                } else {
                    document.getElementById('smer').textContent = observation.winddir || '--';  // Stupně
                }

                document.getElementById('vlhkost').textContent = observation.humidity || '--';
                document.getElementById('sracky').textContent = observation.metric.precipTotal || '--';

                const pressureInSelectedUnit = convertPressure(observation.metric.pressure, pressureUnit);
                document.getElementById('tlak').textContent = pressureInSelectedUnit;
                document.getElementById('pressure-unit').textContent = pressureUnit;

            } else {
                console.error('Chyba: Data nejsou dostupná.');
            }
        })
        .catch(error => {
            console.error('Chyba při načítání dat z API:', error);
        });
}

setInterval(updateWeatherData, 30);

document.addEventListener('DOMContentLoaded', updateWeatherData);

document.getElementById('temp-unit-select').addEventListener('change', updateWeatherData);
document.getElementById('wind-speed-unit-select').addEventListener('change', updateWeatherData);
document.getElementById('wind-dir-select').addEventListener('change', updateWeatherData);
document.getElementById('pressure-unit-select').addEventListener('change', updateWeatherData);
