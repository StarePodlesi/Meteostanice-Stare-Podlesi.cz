document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'tvůj_API_klíč';  // Zde vlož svůj Wunderground API klíč
    const stationId = 'tvůj_station_ID';  // Zde vlož ID své meteostanice
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const observation = data.observations[0];

            // Zobrazení dat o počasí
            document.getElementById('teplota').textContent = observation.metric.temp + ' °C';
            document.getElementById('vlhkost').textContent = observation.humidity + ' %';
            document.getElementById('tlak').textContent = observation.metric.pressure + ' hPa';
            document.getElementById('srazky').textContent = (observation.metric.precipTotal || 0) + ' mm';
            document.getElementById('vitr').textContent = observation.metric.windSpeed + ' km/h';
            document.getElementById('smer-vetru').textContent = observation.winddir;

