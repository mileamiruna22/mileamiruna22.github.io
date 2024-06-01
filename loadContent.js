function loadContent(elementId, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error(`Eroare la încărcarea conținutului: ${error}`);
        });
}


document.addEventListener("DOMContentLoaded", () => {
    loadContent("menu-placeholder", "menu.html");
    loadContent("favicon-placeholder", "icon.html");
});
