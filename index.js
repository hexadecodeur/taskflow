const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('#error');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        })
    })
    .then(data => data.json())
    .then(data => {
        if(data.accessToken) {
            localStorage.setItem('token', data.accessToken);
            window.location.href = 'dashboard.html';
        } else {
            error.textContent = 'Identifiants invalides';
        }
    })
    .catch(err => {
        error.textContent = 'Identifiants invalides';
    });
});
