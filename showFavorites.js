document.addEventListener('DOMContentLoaded', function() {
    // Obține containerul unde se va afișa lista de favorite
    const favoritesContainer = document.getElementById('favoritesList');

    // Obține lista de favorite din localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorites added yet.</p>"; // Mesaj dacă nu sunt favorite
    } else {
        // Construiește lista de orașe favorite
        let listHTML = "<ul>"; // Începe lista neordonată
        favorites.forEach((city) => {
            listHTML += `<li>${city}</li>`; // Adaugă fiecare oraș în listă
        });
        listHTML += "</ul>"; // Încheie lista

        favoritesContainer.innerHTML = listHTML; // Afișează lista în container
    }
    
});


// clearContent.js
document.addEventListener('DOMContentLoaded', function() {
    const clearFavorites = document.getElementById('clearFavorites'); // Butonul de ștergere
    const favoritesContainer = document.getElementById('favoritesList'); // Containerul listei de favorite

    // Evenimentul pentru ștergerea conținutului
    clearFavorites.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all favorite cities?")) { // Confirmare înainte de ștergere
            localStorage.removeItem('favorites'); // Șterge lista de favorite din localStorage
            favoritesContainer.innerHTML = "<p>No favorites added yet.</p>"; // Afișează mesajul de listă goală
        }
    });
});
