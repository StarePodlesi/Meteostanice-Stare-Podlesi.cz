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

            // Příklad grafu teploty (historická data)
            const teploty = [12, 14, 18, 21, 19]; // Zde můžeš načíst skutečná data z API
            const casy = ['00:00', '06:00', '12:00', '18:00', '00:00'];

            const ctx = document.getElementById('graf-teplot').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: casy,
                    datasets: [{
                        label: 'Teplota (°C)',
                        data: teploty,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Chyba při načítání dat:', error));
});


