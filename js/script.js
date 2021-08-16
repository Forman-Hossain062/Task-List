let form = document.getElementById('task_form');
let new_task = document.getElementById('new_task');
let filter_task = document.getElementById('filter_task');
let task_list = document.getElementById('task');
let clear_task = document.getElementById('clear_tasks');

form.addEventListener('submit', addTask);
task_list.addEventListener('click', removeTask);
clear_task.addEventListener('click', clearTask);
filter_task.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks)

function addTask(e) {
    if (new_task.value == "") {
        alert('No task here!')
    }
    else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(new_task.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', "#");
        link.innerHTML = "x"
        li.appendChild(link);
        task_list.appendChild(li);

        storeInLocalStorage(new_task.value);

        new_task.value = '';
    }
    e.preventDefault();
}

function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove()

            removeFromLS(ele);
        }
    }
}
function clearTask(e) {
    // task_list.innerHTML = ""
    while (task_list.firstChild) {
        task_list.removeChild(task_list.firstChild)
    }
    localStorage.clear();
}

function filterTask(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(tsk => {
        let item = tsk.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            tsk.style.display = "block";
        }
        else {
            tsk.style.display = "none";
        }
    })
}

function storeInLocalStorage(Ttask) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(Ttask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', "#");
        link.innerHTML = "x"
        li.appendChild(link);
        task_list.appendChild(li);
    })
}



function removeFromLS(listItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    let li = listItem;
    li.removeChild(li.lastChild); //remove a -> X tag

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}