const lat = 43.6724;
const lon = -111.9127;

async function fetchWeatherGov() {
    try {
        const pointRes = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
        if (!pointRes.ok) throw new Error('Failed to get gridpoint');
        const pointData = await pointRes.json();
        const forecastUrl = pointData.properties.forecast;

        const forecastRes = await fetch(forecastUrl);
        if (!forecastRes.ok) throw new Error('Failed to get forecast');
        const forecastData = await forecastRes.json();

        const periods = forecastData.properties.periods.slice(0, 3);
        document.getElementById('current-weather').innerHTML = `
            <p>
                ${periods[0].temperature}°F<br>
                ${periods[0].shortForecast}<br>
                Wind: ${periods[0].windSpeed} ${periods[0].windDirection}<br>
                ${periods[0].detailedForecast}
            </p>
        `;
        let forecastHtml = '';
        periods.forEach((p, idx) => {
            forecastHtml += `${idx === 0 ? 'Today' : p.name}: <strong>${p.temperature}°F</strong><br>`;
        });
        document.getElementById('weather-forecast').innerHTML = `<p>${forecastHtml}</p>`;
    } catch (err) {
        document.getElementById('current-weather').innerHTML = '<p>Error loading weather.</p>';
        document.getElementById('weather-forecast').innerHTML = '<p>Error loading forecast.</p>';
    }
}

fetchWeatherGov();
setInterval(fetchWeatherGov, 600000);