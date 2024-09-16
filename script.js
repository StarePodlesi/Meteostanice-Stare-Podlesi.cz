// Zadej svůj API klíč a ID meteostanice
const apiKey = 'e351e5d13283470991e5d13283f7098f';  // Nahraď tvým API klíčem
const stationId = 'IPODLE19';  // Nahraď ID tvé meteostanice

// Funkce pro převedení směru větru z úhlů na světové strany
function windDirectionFromDegrees(degrees) {
    const directions = ['S', 'SSV', 'SV', 'VSV', 'V', 'VJV', 'JV', 'JJV', 'J', 'JJZ', 'JZ', 'ZJZ', 'Z', 'ZSZ', 'SZ', 'SSZ'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

// Funkce pro převod teploty na různé jednotky
function convertTemperature(tempCelsius, unit) {
    if (unit === 'F') {
        return (tempCelsius * 9/5 + 32).toFixed(1);  // Převod na Fahrenheit
    }
    return tempCelsius.toFixed(1);  // Celsius (výchozí)
}

// Funkce pro převod rychlosti větru na různé jednotky
function convertWindSpeed(speedKmH, unit) {
    if (unit === 'mph') {
        return (speedKmH * 0.621371).toFixed(1);  // Převod na mph
    }
    return speedKmH.toFixed(1);  // km/h (výchozí)
}

// Funkce pro převod tlaku na různé jednotky
function convertPressure(pressureInHpa, unit) {
    switch (unit) {
        case 'mmHg':
            return (pressureInHpa * 0.75006).toFixed(2);  // Převod na mmHg
        case 'inHg':
            return (pressureInHpa * 0.02953).toFixed(2);  // Převod na inHg
        default:
            return pressureInHpa.toFixed(2);  // hPa (výchozí)
    }
}

// Funkce pro načítání dat z API
function updateWeatherData() {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

    // Načtení dat z API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.observations && data.observations.length > 0) {
                const observation = data.observations[0];  // První záznam

                // Získání vybraných jednotek
                const tempUnit = document.getElementById('temp-unit-select').value;
                const windSpeedUnit = document.getElementById('wind-speed-unit-select').value;
                const windDirUnit = document.getElementById('wind-dir-select').value;
                const pressureUnit = document.getElementById('pressure-unit-select').value;

                // Převod a zobrazení teploty
                const tempInSelectedUnit = convertTemperature(observation.metric.temp, tempUnit);
                document.getElementById('teplota').textContent = tempInSelectedUnit;
                document.getElementById('temp-unit').textContent = `°${tempUnit}`;

                // Převod a zobrazení rychlosti větru
                const windSpeedInSelectedUnit = convertWindSpeed(observation.metric.windSpeed, windSpeedUnit);
                document.getElementById('vitr').textContent = windSpeedInSelectedUnit;
                document.getElementById('wind-speed-unit').textContent = windSpeedUnit;

                // Zobrazení směru větru
                if (windDirUnit === 'directions') {
                    const windDirection = windDirectionFromDegrees(observation.winddir);
                    document.getElementById('smer').textContent = windDirection || '--';
                } else {
                    document.getElementById('smer').textContent = observation.winddir || '--';  // Stupně
                }

                document.getElementById('vlhkost').textContent = observation.humidity || '--';
                document.getElementById('sracky').textContent = observation.metric.precipTotal || '--';

                // Převedení tlaku podle zvolené jednotky
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

// Aktualizace dat každých 30 sekund
setInterval(updateWeatherData, 30000);

// Načtení dat ihned po načtení stránky
document.addEventListener('DOMContentLoaded', updateWeatherData);

// Aktualizace dat při změně jednotek
document.getElementById('temp-unit-select').addEventListener('change', updateWeatherData);
document.getElementById('wind-speed-unit-select').addEventListener('change', updateWeatherData);
document.getElementById('wind-dir-select').addEventListener('change', updateWeatherData);
document.getElementById('pressure-unit-select').addEventListener('change', updateWeatherData);
