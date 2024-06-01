// Function to show/hide the sun
function showSun() {
    document.getElementById('sunny').style.display = 'block';
}

function hideSun() {
    document.getElementById('sunny').style.display = 'none';
}

// Function to show/hide rain
function showRain() {
    document.getElementById('rain').style.display = 'block';
}

function hideRain() {
    document.getElementById('rain').style.display = 'none';
}

// Function to show/hide snow
function showSnow() {
    document.getElementById('snow').style.display = 'block';
}

function hideSnow() {
    document.getElementById('snow').style.display = 'none';
}

// Function to darken the background for cloudy weather
function darkenBackground() {
    document.getElementById('overlay').style.display = 'block';
}

function resetBackground() {
    document.getElementById('overlay').style.display = 'none';
}


function handleSearch() {
    var cityName = document.getElementById('searchInput').value;
    // Assume getWeatherDescription is a function to get weather description based on city name
    var weatherDescription = displayForecast(forecast, cityName);
    displayWeatherEffect(weatherDescription);
}

// Add event listener for search button click

// Function to display weather effect based on description
function displayWeatherEffect(description) {

    document.getElementById('searchButton').addEventListener('click', handleSearch);
    console.log(description);
    hideSun();
    hideRain();
    hideSnow();
    resetBackground();
    
    if (description.includes('clear')) {
        showSun();
    } else if (description.includes('rain')) {
        showRain();
    } else if (description.includes('snow')) {
        showSnow();
    } else if (description.includes('clouds')) {
        darkenBackground();
    }
}

// Function to be called when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Example usage of the function
    displayWeatherEffect('clear sky');
});
