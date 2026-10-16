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

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            taskItem.appendChild(taskTitle);
            taskItem.appendChild(taskStatus);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
        });
    });
}


function createTask() {
    const form = document.getElementById('task-form');
    // const titleTask = document.getElementById('task-title');
    // const descriptionTask = document.getElementById('task-description');
    // const statusTask = document.getElementById('task-status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log(editTaskId);
        fetch('http://localhost:3000/tasks' + (editTaskId ? ('/' + editTaskId) : ''), {
            method: editTaskId ? 'PUT' : 'POST', 
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleTask.value,
                description: descriptionTask.value,
                status: statusTask.value,
                projectId: id, 
            })
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