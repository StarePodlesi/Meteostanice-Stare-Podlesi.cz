<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meteostanice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        h1 {
            color: #333;
        }

        #weather-data {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }

        p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>Počasí z Wunderground API</h1>
    <div id="weather-data">
        <p>Teplota: <span id="teplota">--</span> °C</p>
        <p>Vlhkost vzduchu: <span id="vlhkost">--</span> %</p>
        <p>Atmosférický tlak: <span id="tlak">--</span> hPa</p>
        <p>Srážky za den: <span id="sracky">--</span> mm</p>
        <p>Směr větru: <span id="smer">--</span> °</p>
        <p>Rychlost větru: <span id="vitr">--</span> km/h</p>
    </div>

    <script>
        const apiKey = 'e351e5d13283470991e5d13283f7098f';  // Zde vlož svůj API klíč
        const stationId = 'IPODLE19';  // Zde vlož ID své meteostanice

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
                        document.getElementById('smer').textContent = observation.windDir || '--';
                        document.getElementById('vitr').textContent = observation.metric.windSpeed || '--';
                    } else {
                        console.error('Chyba: Data nejsou dostupná.');
                    }
                })
                .catch(error => {
                    console.error('Chyba při načítání dat z API:', error);
                });
        }

        // Aktualizace každých 30 sekund
        setInterval(updateWeatherData, 30);

        // První aktualizace ihned po načtení stránky
        document.addEventListener('DOMContentLoaded', () => {
            updateWeatherData();
        });
    </script>
</body>
</html>
