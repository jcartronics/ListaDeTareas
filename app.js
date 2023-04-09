// Definir Variables UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Cargar todos los eventos
loadEventListeners();

// Cargar todos los eventos
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Evento Agregar Tarea
    form.addEventListener('submit', addTask);
    //Evento Borrar Tarea
    taskList.addEventListener('click', removeTask);
    //Evento Borrar Tareas
    clearBtn.addEventListener('click', clearTasks);
    //Evento Filtrar Tareas
    filter.addEventListener('keyup', filterTasks);
}

// Obtener Tareas del Local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Crear elemento li
        const li = document.createElement('li');
        // Agregar clase
        li.className = 'collection-item';
        // Crear texto y agregarlo al li
        li.appendChild(document.createTextNode(task));
        // Crear nuevo enlace
        const link = document.createElement('a');
        // Agregar clase
        link.className = 'delete-item secondary-content';
        // Agregar icono html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Agregar el enlace al li
        li.appendChild(link);

        // Agregar li a la lista
        taskList.appendChild(li);
    });
}

// Agregar Tarea
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // Crear elemento li
    const li = document.createElement('li');
    // Agregar clase
    li.className = 'collection-item';
    // Crear texto y agregarlo al li
    li.appendChild(document.createTextNode(taskInput.value));
    // Crear nuevo enlace
    const link = document.createElement('a');
    // Agregar clase
    link.className = 'delete-item secondary-content';
    // Agregar icono html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Agregar el enlace al li
    li.appendChild(link);

    // Agregar li a la lista
    taskList.appendChild(li);

    // Almacenar en Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Limpiar input
    taskInput.value = '';

    e.preventDefault();
}

// Almacenar Tarea
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Borrar Tarea
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Confirma para borrar la tarea')) {
            e.target.parentElement.parentElement.remove();

            // Borrar de Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Borrar de Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Borrar todas las Tareas
function clearTasks() {

    if (confirm('Confirma para borrar todas las tareas')) {
        // taskList.innerHTML = '';

        // Borrar de forma rapida
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // Borrar de Local Storage
        clearTasksFromLocalStorage();
    }
}

// Borrar de Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filtrar Tareas
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}