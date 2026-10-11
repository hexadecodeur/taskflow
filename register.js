const form = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if(nameInput.value.length >= 3 && email.value.length >= 3 && password.value.length >= 5) {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: nameInput.value,
                email: email.value,
                password: password.value
            })
        }).then(() => {
            window.location.href = 'index.html';
        })
    } else {
        error.textContent = 'Veuillez saisir tous les champs et au moins 5 caractères pour le mot de passe';
    }
});