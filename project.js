const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const titleTask = document.getElementById('task-title');
const descriptionTask = document.getElementById('task-description');
const statusTask = document.getElementById('task-status');

const taskFormTitle = document.getElementById('task-form-title');
const taskFormButton = document.getElementById('task-form-button');

let editTaskId = null;

function getData() {
    const description = document.getElementById('description');
    const title = document.getElementById('title');
    const taskList = document.querySelector('.task-list');

    if(!id) {
        window.location.href = 'dashboard.html'
    }

    secureFetch('http://localhost:3000/projects/' + id)
    .then(data => data.json())
    .then(project => {
        title.textContent = project.title;
        description.textContent = project.description;
    })
    .catch(err => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

    secureFetch('http://localhost:3000/tasks?projectId=' + id)
    .then(data => data.json())
    .then(tasks => {
        console.log(tasks);
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');

            const taskTitle = document.createElement('div');
            taskTitle.classList.add('task-title');
            taskTitle.textContent = task.title;
            
            const taskStatus = document.createElement('span');
            taskStatus.classList.add('chip');
            if(task.status === 'à faire')
                taskStatus.classList.add('todo');
            else if(task.status === 'en cours')
                taskStatus.classList.add('doing');
            else
                taskStatus.classList.add('done');
            taskStatus.textContent = task.status;

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            const editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.textContent = 'Modifier';
            editButton.addEventListener('click', function() {
                taskFormTitle.textContent = 'Modifier la tâche';
                taskFormButton.textContent = 'Modifier la tâche';
                titleTask.value = task.title;
                descriptionTask.value = task.description;
                statusTask.value = task.status;
                editTaskId = task.id;
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = 'Supprimer';

            deleteButton.addEventListener('click', function() {
                const confirmDelete = confirm('Voulez-vous vraiment supprimer la tâche ' + task.title + ' ?');

                if(confirmDelete) {
                    secureFetch('http://localhost:3000/tasks/' + task.id, 'DELETE').then(data => {
                        getData();
                    });
                }
            });

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            taskItem.appendChild(taskTitle);
            taskItem.appendChild(taskStatus);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
        });
    })
    .catch(err => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
}


function createTask() {
    const form = document.getElementById('task-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log(editTaskId);
        secureFetch('http://localhost:3000/tasks' + (editTaskId ? ('/' + editTaskId) : ''),
        editTaskId ? 'PUT' : 'POST',
        {
            title: titleTask.value,
            description: descriptionTask.value,
            status: statusTask.value,
            projectId: id, 
        }).then(data => data.json())
        .then(task => {
            titleTask.value = '';
            descriptionTask.value = '';
            statusTask.value = 'à faire';
            editTaskId = null;
            taskFormTitle.textContent = 'Ajouter une tâche';
            taskFormButton.textContent = 'Ajouter la tâche';
            getData();
        });
    });
}

getData();
createTask();