const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

const taskList = document.querySelector("#task-list");
const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const submit = document.querySelector("#submit");

function isDuplicateTask(newTitle, excludeIndex = -1) {
    const isDuplicate = tasks.some((task, index) => task.title.toLowerCase() === newTitle.toLowerCase() && excludeIndex !== index)
    return isDuplicate;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

taskList.onclick = function (e) {
    const taskItem = e.target.closest(".task-item");

    if(!taskItem) return; // taskItem mà null thì thoát hàm

    // const taskIndex = taskItem.getAttribute("data-index");
    const taskIndex = +taskItem.dataset.index;
    console.log(taskItem);
    

    const task = tasks[taskIndex];
    console.log(taskItem);

    if (e.target.closest(".edit")) {
        const newTitle = prompt("Enter your new task: ", task.title);
        if(newTitle === null) return; // Kiểm tra khi nhấn nút cancel newTitle trả về null

        if(!newTitle.trim()) { //Kiểm tra khi người dùng nhập khoảngg trắng 
            alert(`Task title can't be empty!!!`);
            return;
        }

        ;
        if(isDuplicateTask(newTitle, taskIndex)) {
            return;
        }

        task.title = newTitle;
        render();
        saveTasks();
    } else if (e.target.closest(".done")) {
        task.completed = !task.completed;
        render();
        saveTasks();
    } else if (e.target.closest(".delete")) {
        if (confirm(`Are you sure you want to delete ${task.title} !!!`)) {
            tasks.splice(taskIndex, 1);
            render();
            saveTasks();
        }
    }
};

todoForm.onsubmit = function (e) {
    e.preventDefault();
    const newValue = todoInput.value.trim();
    if (!newValue) {
        todoInput.value = "";
        return alert("Please write something!");
    }

    if(isDuplicateTask(newValue)) {
        alert(`Task title is Duplicate, Please enter task title difference!!!`);
        todoInput.value = "";
        return;
    }

    tasks.push({
        title: newValue,
        completed: false,
    });
    render();
    saveTasks();

    todoInput.value = "";
};

function render() {
    if (!tasks.length) {
       return taskList.innerHTML = '<li class="empty-message">No tasks available</li>';
    }
    const html = tasks
        .map(
            (task, index) =>
                `
    <li class="task-item ${
        task.completed ? "completed" : ""
    }" data-index = ${index}>
        <span class="task-title">${task.title}</span>
        <div class="task-action">
            <button  class="task-btn edit">Edit</button>
            <button  class="task-btn done">${
                task.completed ? "Mark as undone" : "Mark as done"
            }</button>
            <button  class="task-btn delete">Delete</button>
        </div>
    </li>
    `
        )
        .join("");
    taskList.innerHTML = html;
}

render();
