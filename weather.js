document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const weatherInfo = document.getElementById('weather-info');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const city = document.getElementById('city').value; 
            await fetchWeather(city); 
        });
    }
});

async function fetchWeather(city) {
    const apiKey = 'eea7e765601f09cfae88cfbd0414a413'; 
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erreur');
        }
        const weather = await response.json(); 
        const temperature = Math.round(weather.main.temp);
        const date = new Date();
        const formatDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        
        weatherInfo.textContent = `Météo pour ${city}: ${temperature}°C à ${formatDate}.`;
    } catch (error) {
        console.error(error); 
        weatherInfo.textContent = "Erreur";
    }
}
