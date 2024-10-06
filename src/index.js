document.addEventListener("DOMContentLoaded", () => {
  // your code here
    const form = document.querySelector('#create-task-form');
    const taskInput = document.getElementById('new-task-description');
    const priorityInput = document.getElementById('priority-input');
    const dueDateInput = document.getElementById('due-date-input');
    const taskList = document.querySelector('#tasks');
    const sortBtn = document.getElementById('sort-btn');

    let tasks = [];
    let sortOrder = 'asc';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = {
            name: taskInput.value,
            priority: priorityInput.value,
            dueDate: dueDateInput.value
        };
        tasks.push(task);
        buildToDo(task);
        form.reset();
    });

    function buildToDo(task) {
        const li = document.createElement('li');
        li.className = task.priority;
        li.style.color = getPriorityColor(task.priority);
        li.innerHTML = `
            <span>${task.name} - Priority: ${task.priority} - Due: ${task.dueDate}</span>
            <button onclick="editTask(${tasks.length - 1})">Edit</button>
            <button onclick="deleteTask(${tasks.length - 1})">Delete</button>
        `;
        taskList.appendChild(li);
    }

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    window.editTask = (index) => {
        const task = tasks[index];
        taskInput.value = task.name;
        priorityInput.value = task.priority;
        dueDateInput.value = task.dueDate;
        tasks.splice(index, 1);
        renderTasks();
    };

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            buildToDo(task);
        });
    }

    function getPriorityColor(priority) {
        switch (priority) {
            case 'high':
                return 'red';
            case 'medium':
                return 'yellow';
            case 'low':
                return 'green';
            default:
                return 'black';
        }
    }

    sortBtn.addEventListener('click', () => {
        tasks.sort((a, b) => {
            const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
            return sortOrder === 'asc'
                ? priorityOrder[a.priority] - priorityOrder[b.priority]
                : priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        renderTasks();
    });
});
