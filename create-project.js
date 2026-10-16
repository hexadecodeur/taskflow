const form = document.getElementById('project-form');
const nameInput = document.getElementById('project-name');
const descriptionInput = document.getElementById('project-description');
const error = document.getElementById('error');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if(nameInput.value.lenth < 4) {
        error.textContent = 'Nom du projet invalide';
        return ;
    }
    
    secureFetch('http://localhost:3000/projects', 'POST', {
        title: nameInput.value,
        description: descriptionInput.value
    })
    .then(data => data.json())
    .then(project => {
        window.location.href = 'project.html?id=' + project.id;
    })
});