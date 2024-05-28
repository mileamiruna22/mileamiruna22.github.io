document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '687f0e3d578ca43bf3d0f1d5f618a11e'; // Cheie API OpenWeatherMap
    const weatherForecast = document.getElementById('weatherForecast'); // Container pentru previziuni
    const currentDateSpan = document.getElementById('currentDate'); // Elementul `span` pentru afișarea datei
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const prevDayButton = document.getElementById('prevDay'); // Buton pentru ziua anterioară
    const nextDayButton = document.getElementById('nextDay'); // Buton pentru ziua următoare
    const addToFavorites = document.getElementById('addToFavorites'); // Buton pentru adăugare la favorite
    const favIcon = document.getElementById('favIcon'); // Iconiță pentru favorite

    let dailyForecasts = []; // Lista de previziuni zilnice
    let currentForecastIndex = 0; // Indexul curent în lista de previziuni

    prevDayButton.style.display = 'none';
    nextDayButton.style.display = 'none';
    let iconClass = '';

    function extractDailyForecasts(forecasts) {
        const dailyForecasts = [];
        const datesSeen = new Set(); // Folosim un set pentru a evita duplicările

        // Iterează prin lista de previziuni și extrage una pentru fiecare zi
        for (const forecast of forecasts) {
            const forecastDate = new Date(forecast.dt * 1000);
            const formattedDate = forecastDate.toDateString(); // Formatează data

            // Dacă data nu a fost văzută înainte, adaugă previziunea la lista zilnică
            if (!datesSeen.has(formattedDate)) {
                dailyForecasts.push(forecast);
                datesSeen.add(formattedDate);
            }
        }

        return dailyForecasts; // Returnează lista de previziuni zilnice
    }

    addToFavorites.addEventListener('click', () => {
        const currentCity = localStorage.getItem('currentCity');

        if (currentCity && currentCity.trim() !== '') {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if (!favorites.includes(currentCity)) {
                favorites.push(currentCity); // Adaugă la lista de favorite
                localStorage.setItem('favorites', JSON.stringify(favorites));

                favIcon.src = 'fav2.png'; // Schimbă imaginea butonului pentru a reflecta adăugarea la favorite
            } else {
                alert(`${currentCity} is already in favorites.`); // Mesaj dacă orașul este deja în lista de favorite
            }
        } else {
            alert('No city to add to favorites.');
        }
    });

    function displayForecast(forecast, city) {
        if (!forecast) {
            return; // Dacă nu există previziune
        }
        console.log(forecast)
        const cityName = city.toUpperCase(); // Numele orașului
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
       

        const forecastDate = new Date(forecast.dt * 1000); // Convertim timestamp-ul
        const formattedDate = forecastDate.toDateString(); // Formatează data

        getWeatherIcon(icon);

        const forecastHTML = `
            <h2>${cityName}</h2> <!-- Afișează orașul -->
            <p><i class="wi wi-thermometer"></i><strong> Temperature:</strong> ${temperature}°C</p>
            <p><i class="wi wi-owm-${iconClass}"></i><strong> Description:</strong>${description}</p>
            <p><i class="wi wi-humidity"></i><strong> Humidity:</strong> ${humidity}%</p>
            <p><i class="wi wi-strong-wind"></i><strong> Wind Speed:</strong> ${windSpeed} m/s</p>
        `;

        weatherForecast.innerHTML = forecastHTML; // Afișează datele
        currentDateSpan.innerHTML = `${formattedDate}`; // Afișează orașul și data în `span`

        // Actualizează butoanele Next și Prev Day
        updateDayButtons();
    }

   
    function getWeatherIcon(icon) {
       iconClass = '';
    
        // Verificăm codul meteo pentru a determina icon-ul corespunzător
        switch (icon) {
            case '01d':
                iconClass = 'wi wi-day-sunny';
                break;
            case '01n':
                iconClass = 'wi wi-night-clear';
                break;
            case '02d':
                iconClass = 'wi wi-day-cloudy';
                break;
            case '02n':
                iconClass = 'wi wi-night-alt-cloudy';
                break;
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                iconClass = 'wi wi-cloudy';
                break;
            case '09d':
            case '09n':
            case '10d':
            case '10n':
                iconClass = 'wi wi-rain';
                break;
            case '11d':
            case '11n':
                iconClass = 'wi wi-thunderstorm';
                break;
            case '13d':
            case '13n':
                iconClass = 'wi wi-snow';
                break;
            case '50d':
            case '50n':
                iconClass = 'wi wi-fog';
                break;
            default:
                iconClass = 'wi wi-day-sunny'; // Default, în caz că nu există o potrivire
        }
    
        return iconClass;
    }

    function updateDayButtons() {
        prevDayButton.style.display = currentForecastIndex > 0 ? 'inline-block' : 'none';
        nextDayButton.style.display = currentForecastIndex < dailyForecasts.length - 1 ? 'inline-block' : 'none';
    }

    function searchWeather() {
        const city = searchInput.value.trim(); // Orașul căutat

        if (city === '') {
            alert('Please enter a city name.'); // Mesaj pentru oraș gol
            return;
        }

        if (city[0] !== city[0].toUpperCase()) {
            alert('City name must start with an uppercase letter.'); // Mesaj de eroare
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`); // Gestionare erori
                }
                return response.json(); // Extrage datele
            })
            .then((data) => {
                const forecasts = data.list; // Lista completă de previziuni
                dailyForecasts = extractDailyForecasts(forecasts); // Extrage previziunile zilnice
                currentForecastIndex = 0; // Reinițializează indexul curent
                displayForecast(dailyForecasts[currentForecastIndex], city); // Afișează prima previziune zilnică
                localStorage.setItem('currentCity', city); // Stochează orașul curent în localStorage
            })
            .catch((error) => {
                console.error('Error fetching forecast data:', error); // Gestionare erori
                alert('Error fetching forecast data.'); // Mesaj pentru utilizator
            });

            prevDayButton.style.display = 'inline';
            nextDayButton.style.display = 'inline';
    }

    function goToPreviousDay() {
        if (currentForecastIndex > 0) { // Dacă nu suntem la primul element
            currentForecastIndex--; // Mergi înapoi
            const city = localStorage.getItem('currentCity');
            displayForecast(dailyForecasts[currentForecastIndex], city); // Afișează previziunea zilnică
        }
    }

    function goToNextDay() {
        if (currentForecastIndex < dailyForecasts.length - 1) { // Dacă nu suntem la ultimul element
            currentForecastIndex++; // Mergi înainte
            const city = localStorage.getItem('currentCity');
            displayForecast(dailyForecasts[currentForecastIndex], city); // Afișează previziunea zilnică
        }
    }

    prevDayButton.addEventListener('click', goToPreviousDay); // Buton pentru ziua anterioară
    nextDayButton.addEventListener('click', goToNextDay); // Buton pentru ziua următoare

    searchButton.addEventListener('click', searchWeather); // Buton pentru căutare

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchWeather(); // Caută la Enter
        }
    });
    
});
