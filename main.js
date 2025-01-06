const tasks = [];

const taskList = document.querySelector("#task-list");
const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const submit = document.querySelector("#submit");

taskList.onclick = function (e) {
    const taskItem = e.target.closest(".task-item");
    const taskIndex = taskItem.getAttribute("task-index");
    const task = tasks[taskIndex];
    console.log(taskItem);

    if (e.target.closest(".edit")) {
        const newTitle = prompt("Enter your new task: ", task.title);
        task.title = newTitle;
        render();
    } else if (e.target.closest(".done")) {
        task.completed = !task.completed;
        render();
    } else if (e.target.closest(".delete")) {
        if (confirm(`Are you sure you want to delete ${task.title} !!!`)) {
            tasks.splice(taskIndex, 1);
            render();
        }
    }
};

todoForm.onsubmit = function (e) {
    e.preventDefault();

    if (!todoInput.value.trim()) {
        todoInput.value = "";
        return alert("Please write something!");
    }
    tasks.push({
        title: todoInput.value.trim(),
        completed: false,
    });
    render();

    todoInput.value = "";
};

function render() {
    const html = tasks
        .map(
            (task, index) =>
                `
    <li class="task-item ${
        task.completed ? "completed" : ""
    }" task-index = ${index}>
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
