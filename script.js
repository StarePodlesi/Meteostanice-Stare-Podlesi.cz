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

            // Načtení historických dat pro graf
            loadHistoricalData();
        })
        .catch(error => {
            console.error('Chyba při načítání aktuálních dat:', error);
        });

    // Funkce pro načtení historických dat a vykreslení grafu
    function loadHistoricalData() {
        const historyUrl = `https://api.weather.com/v2/pws/history/all?stationId=${stationId}&format=json&units=m&date=${getCurrentDate()}&apiKey=${apiKey}`;

        fetch(historyUrl)
            .then(response => response.json())
            .then(data => {
                const observations = data.observations;

                // Extrakce časů a teplot
                const times = observations.map(obs => obs.obsTimeLocal.split(' ')[1]);
                const temperatures = observations.map(obs => obs.metric.temp);

                // Vykreslení grafu
                const ctx = document.getElementById('graf-teplot').getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: times,
                        datasets: [{
                            label: 'Teplota (°C)',
                            data: temperatures,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            fill: false,
                            tension: 0.1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Čas'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Teplota (°C)'
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Chyba při načítání historických dat:', error);
            });
    }

    // Funkce pro získání aktuálního data ve formátu YYYYMMDD
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }
});
