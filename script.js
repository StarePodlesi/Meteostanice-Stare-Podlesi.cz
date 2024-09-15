<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meteostanice - Weather Underground</title>
</head>
<body>
    <h1>Počasí z Wunderground API</h1>
    <div id="weather-data">
        <p>Teplota: <span id="teplota">--</span> °C</p>
        <p>Vlhkost: <span id="vlhkost">--</span> %</p>
        <p>Vítr: <span id="vitr">--</span> km/h</p>
        <p>Srážky (za den): <span id="srazky">--</span> mm</p>
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

                    // Zobrazení dat na stránce
                    document.getElementById('teplota').textContent = observation.metric.temp;
                    document.getElementById('vlhkost').textContent = observation.humidity;
                    document.getElementById('vitr').textContent = observation.metric.windSpeed;

                    // Přidání srážek za den a atmosférického tlaku
                    document.getElementById('srazky').textContent = observation.metric.precipTotal || 0;  // Srážky za celý den
                    document.getElementById('tlak').textContent = observation.metric.pressure;
                })
                .catch(error => {
                    console.error('Chyba při načítání dat z API:', error);
                });
        });
    </script>
</body>
</html>
