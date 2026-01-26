const API_KEY = 'a28504a106ed5e53c6084bf4573e0b34';
const LAT = 43.6724;
const LON = -111.9127;

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherURL);
        if (!response.ok) throw new Error('Weather fetch failed');
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        document.getElementById('current-weather').innerHTML = '<p>Unable to load weather data.</p>';
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById('current-weather').innerHTML = `
        <div class="weather-current">
            <img src="${iconUrl}" alt="${description}" width="80" height="80">
            <p class="temp-large"><strong>${temp}°F</strong></p>
            <p>${capitalize(description)}</p>
            <p>High: ${high}°F | Low: ${low}°F</p>
            <p>Humidity: ${humidity}%</p>
        </div>
    `;
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) throw new Error('Forecast fetch failed');
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        document.getElementById('weather-forecast').innerHTML = '<p>Unable to load forecast.</p>';
    }
}

function displayForecast(data) {
    const today = new Date().getDate();
    const dailyForecasts = [];
    const seenDays = new Set();

    for (const item of data.list) {
        const date = new Date(item.dt * 1000);
        const day = date.getDate();
        const hour = date.getHours();

        if (day !== today && !seenDays.has(day) && hour >= 11 && hour <= 14) {
            seenDays.add(day);
            dailyForecasts.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(item.main.temp),
                icon: item.weather[0].icon,
                description: item.weather[0].description
            });
            if (dailyForecasts.length >= 3) break;
        }
    }

    let html = '<div class="forecast-days">';
    dailyForecasts.forEach(forecast => {
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.icon}.png`;
        html += `
            <div class="forecast-day">
                <strong>${forecast.day}</strong><br>
                <img src="${iconUrl}" alt="${forecast.description}" width="40" height="40"><br>
                ${forecast.temp}°F
            </div>
        `;
    });
    html += '</div>';

    document.getElementById('weather-forecast').innerHTML = html;
}

fetchCurrentWeather();
fetchForecast();

setInterval(() => {
    fetchCurrentWeather();
    fetchForecast();
}, 600000);