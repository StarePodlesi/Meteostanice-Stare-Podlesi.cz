// Zadej svůj API klíč a ID meteostanice
const apiKey = 'e351e5d13283470991e5d13283f7098f';  // Nahraď tvým API klíčem
const stationId = 'IPODLE19';  // Nahraď ID tvé meteostanice

// Funkce pro načítání dat z API
function updateWeatherData() {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

    // Načtení dat z API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.observations && data.observations.length > 0) {
                const observation = data.observations[0];  // První záznam
                document.getElementById('teplota').textContent = observation.metric.temp || '--';
                document.getElementById('vlhkost').textContent = observation.humidity || '--';
                document.getElementById('tlak').textContent = observation.metric.pressure || '--';
                document.getElementById('sracky').textContent = observation.metric.precipTotal || '--';
                document.getElementById('smer').textContent = observation.winddir || '--';
                document.getElementById('vitr').textContent = observation.metric.windSpeed || '--';
            } else {
                console.error('Chyba: Data nejsou dostupná.');
            }
        })
        .catch(error => {
            console.error('Chyba při načítání dat z API:', error);
        });
}

// Aktualizace dat každých 30 sekund
setInterval(updateWeatherData, 30);

// Načtení dat ihned po načtení stránky
document.addEventListener('DOMContentLoaded', updateWeatherData);
