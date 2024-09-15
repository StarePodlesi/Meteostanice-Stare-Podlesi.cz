const apiKey = 'e351e5d13283470991e5d13283f7098f'; 
const stationId = 'IPODLE19';  

function updateWeatherData() {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.observations && data.observations.length > 0) {
                const observation = data.observations[0];  // První záznam
                document.getElementById('teplota').textContent = observation.metric.temp || '--';
                document.getElementById('vlhkost').textContent = observation.humidity || '--';
                document.getElementById('tlak').textContent = observation.metric.pressure || '--';
                document.getElementById('srazky').textContent = observation.metric.precipTotal || '--';
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

setInterval(updateWeatherData, 300);

document.addEventListener('DOMContentLoaded', updateWeatherData);
