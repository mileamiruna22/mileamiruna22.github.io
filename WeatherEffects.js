// Function to show/hide the sun
function showSun() {
    document.getElementById('sun').style.display = 'block';
}

function hideSun() {
    document.getElementById('sun').style.display = 'none';
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
    document.body.style.backgroundColor = '#b0c4de';
}

function resetBackground() {
    document.body.style.backgroundColor = 'linear-gradient(135deg, #e0eafc, #cfdef3)';
}

// Function to display weather effect based on description
function displayWeatherEffect(description) {
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
    // Mock function call to demonstrate effect
    displayWeatherEffect('clear sky');
});
