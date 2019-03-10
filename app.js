//get UIs
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const listTask = document.querySelector('.collection');
const filterTask = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

//load all event listeners
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getItems);
    form.addEventListener('submit', addTask);
    listTask.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filterTask.addEventListener('keyup', filter);
}

function getItems() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-times"></i>';
        li.appendChild(link);
        li.appendChild(document.createTextNode(task));

        taskInput.value = '';
        listTask.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Please enter a valid value');
    } else{
        const li = document.createElement('li');
        li.className = 'collection-item';
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-times"></i>';
        li.appendChild(link);
        li.appendChild(document.createTextNode(taskInput.value));

        addTaskToLocalStorage(taskInput.value);
        taskInput.value = '';
        listTask.appendChild(li);
       // console.log(li);
       
    }
    e.preventDefault()
}

function addTaskToLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e) {
    if(e.target.parentElement) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
        removefromLS(e.target.parentElement.parentElement);

        alert('Deleted!')
        //console.log(e.target);
    }
}
function removefromLS(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    listTask.innerHTML = '';

    //CLEAR FROM LS
    clearTasksLS();
}

function clearTasksLS() {
    localStorage.clear();
}
function filter(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display ='block';
        } else{
            task.style.display ='none';
        }
    });
}