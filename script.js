document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'e351e5d13283470991e5d13283f7098f';  
    const stationId = 'IPODLE19'; 
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

    // Funkce pro načtení aktuálních dat
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const observation = data.observations[0];

            // Zobrazení dat na stránce
            document.getElementById('teplota').textContent = observation.metric.temp;
            document.getElementById('vlhkost').textContent = observation.humidity;
            document.getElementById('tlak').textContent = observation.metric.pressure;
            document.getElementById('srazky').textContent = observation.metric.precipTotal || 0;
            document.getElementById('rychlost-vetru').textContent = observation.metric.windSpeed;
            document.getElementById('smer-vetru').textContent = observation.winddir;



