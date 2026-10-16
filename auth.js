const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'index.html';
}

function secureFetch(url, method = 'GET', body = null) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
}