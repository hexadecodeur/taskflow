const logout = document.querySelector('#logout');
const projectsContainer = document.querySelector('.projects');

logout.addEventListener('click', function () {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

secureFetch('http://localhost:3000/projects')
.then(data => data.json())
.then(projects => {
    console.log(projects);

    projects.forEach(project => {
        const projectCard= document.createElement('div');
        projectCard.classList.add('project-card');

        const h3 = document.createElement('h3');
        h3.textContent = project.title;

        const p = document.createElement('p');
        p.textContent = project.description;

        const a = document.createElement('a');
        a.textContent = 'Voir le projet';
        a.href = 'project.html?id=' + project.id;

        projectCard.appendChild(h3);
        projectCard.appendChild(p);
        projectCard.appendChild(a);

        projectsContainer.appendChild(projectCard);
    });
    
});