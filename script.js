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
        <p>Vlhkost: <span id="vlhkost">--</span> %</p>
        <p>Vítr: <span id="vitr">--</span> km/h</p>
        <p>Srážky: <span id="sracky">--</span> mm</p>
        <p>Atmosférický tlak: <span id="tlak">--</span> hPa</p>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const apiKey = 'tvůj_API_klíč';  // Zde vlož svůj API klíč
            const stationId = 'tvůj_station_ID';  // Zde vlož ID své meteostanice
            const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`;
            
            // Získání dat z API
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const observation = data.observations[0];  // První záznam z výsledků
                    const temp = observation.metric.temp || '--';  // Teplota
                    const humidity = observation.humidity || '--';  // Vlhkost
                    const windSpeed = observation.metric.windSpeed || '--';  // Vítr
                    const precip = observation.metric.precipTotal || '--';  // Srážky
                    const pressure = observation.metric.pressure || '--';  // Atmosférický tlak
                    
                    // Aktualizace HTML prvků
                    document.getElementById('teplota').textContent = temp;
                    document.getElementById('vlhkost').textContent = humidity;
                    document.getElementById('vitr').textContent = windSpeed;
                    document.getElementById('sracky').textContent = precip;
                    document.getElementById('tlak').textContent = pressure;
                })
                .catch(error => {
                    console.error('Chyba při načítání dat z API:', error);
                });
        });
    </script>
</body>
</html>
