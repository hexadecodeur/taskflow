const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const description = document.getElementById('description');
const title = document.getElementById('title');
const taskList = document.querySelector('.task-list');

if(!id) {
    window.location.href = 'dashboard.html'
}

fetch('http://localhost:3000/projects/' + id, {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(data => data.json())
.then(project => {
    title.textContent = project.title;
    description.textContent = project.description;
})

fetch('http://localhost:3000/tasks?projectId=' + id, {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(data => data.json())
.then(tasks => {
    console.log(tasks);
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;
        
        const taskStatus = document.createElement('span');
        taskStatus.classList.add('chip');
        taskStatus.classList.add('doing');
        taskStatus.textContent = task.status;

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = 'Modifier';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Supprimer';

        taskActions.appendChild(editButton);
        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskTitle);
        taskItem.appendChild(taskStatus);
        taskItem.appendChild(taskActions);

        taskList.appendChild(taskItem);
    });
})