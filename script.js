<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meteostanice Staré Podlesí</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #00bcd4, #ffffff);
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
        }

        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 15px;
            max-width: 800px;
            width: 90%;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        h1 {
            color: #00796b;
            margin-bottom: 20px;
            font-size: 2rem;
        }

        p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin: 20px 0;
        }

        .records {
            margin-top: 20px;
            font-size: 1.1rem;
        }

        .records p {
            margin: 10px 0;
            font-weight: bold;
        }

        a {
            text-decoration: none;
            background-color: #00796b;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 1.1rem;
            transition: background-color 0.3s ease;
            display: inline-block;
            margin-top: 20px;
        }

        a:hover {
            background-color: #004d40;
        }

        /* Responsivní styl */
        @media (max-width: 600px) {
            h1 {
                font-size: 1.5rem;
            }

            p {
                font-size: 1rem;
            }

            .records p {
                font-size: 1rem;
            }

            a {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Meteostanice Staré Podlesí</h1>
        <p>
            Meteorologická stanice Staré Podlesí se nachází ve stejnojmenné vesnici v Podbrdí, v katastru města Příbram, Středočeský kraj.
        </p>
        <p>
            <strong>Měření:</strong> Meteostanice začala nahrávat svá data 27. prosince roku 2023. Nachází se zde i čidla na měření vlhkosti a teploty půdy, teploty a vlhkosti vzduchu a sněhoměr (ve výstavbě).
        </p>
        <div class="records">
            <h2>Rekordy meteostanice:</h2>
            <p>Maximální teplota vzduchu: 34,6 °C</p>
            <p>Minimální teplota vzduchu: -8,3 °C</p>
            <p>Maximální výška sněhu: 25 cm</p>
            <p>Maximální náraz větru: 16,5 km/h</p>
        </div>
        <a href="weather.html">Zobrazit aktuální počasí</a>
    </div>
</body>
</html>
