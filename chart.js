document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'e351e5d13283470991e5d13283f7098f';  // Zde vlož svůj API klíč
    const stationId = 'IPODLE19';  // Zde vlož ID své meteostanice
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const observation = data.observations[0];

            // Data o počasí
            const teploty = [12, 14, 18, 21, 19]; // Zde můžeš načíst skutečná historická data z API
            const casy = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']; // Časové značky

            // Vykreslení grafu teploty
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

            // Podobně můžeš vykreslit grafy pro ostatní veličiny (např. vlhkost, vítr, tlak)
        })
        .catch(error => console.error('Chyba při načítání dat:', error));
});
