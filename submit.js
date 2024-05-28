document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form'); 
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const name = document.getElementById('name').value; 
            const email = document.getElementById('email').value; 
            const message = document.getElementById('message').value; 

            const requestData = {
                name: name,
                email: email,
                message: message
            };

            const url = 'https://api.bwt.ro/api/dev/FE/post'; 
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' ,
                    'X-STUDENT-HEADER': 'MILEA MIRUNA_IOANA'
                },
                body: JSON.stringify(requestData) 
            };

            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.status}`);
                    }

                    return response.json(); 
                })
                .then(data => {
                    
                    alert('Mesajul tău a fost trimis cu succes! Îți vom răspunde în cel mai scurt timp.');
                    
                   
                    form.reset();
                })
                .catch(error => {
                    console.error('A avut loc o eroare la trimiterea formularului:', error);
                    alert('A avut loc o eroare. Te rugăm să încerci din nou mai târziu.');
                });
        });
    }
});
