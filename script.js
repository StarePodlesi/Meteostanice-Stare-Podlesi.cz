document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'e351e5d13283470991e5d13283f7098f';  
    const stationId = 'IPODLE19';  
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Zpracování dat z API
            const observation = data.observations[0];
            
            // Získání dat o počasí
            const teplota = observation.metric.temp;  
            const vlhkost = observation.humidity;  
            const tlak = observation.metric.pressure;  
            const srazky = observation.metric.precipTotal || 0;  
            const vitrRychlost = observation.metric.windSpeed;  
            const smerVetry = observation.winddir;  

            // Zobrazení dat na stránce
            document.getElementById('teplota').textContent = teplota + ' °C';
            document.getElementById('vlhkost').textContent = vlhkost + ' %';
            document.getElementById('tlak').textContent = tlak + ' hPa';
            document.getElementById('srazky').textContent = srazky + ' mm';
            document.getElementById('vitr').textContent = vitrRychlost + ' km/h';
            document.getElementById('smer-vetru').textContent = smerVetru;
