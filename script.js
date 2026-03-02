document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText);
    saveTask(taskText);

    input.value = "";
}

// Create task element
function createTaskElement(taskText, completed = false) {
    const li = document.createElement("li");

    if (completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = taskText;

    span.onclick = function () {
        li.classList.toggle("completed");
        updateStorage();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function () {
        li.remove();
        updateStorage();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on refresh
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Update storage after changes
function updateStorage() {
    const taskElements = document.querySelectorAll("#taskList li");
    const tasks = [];

    taskElements.forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Clear all tasks
function clearAll() {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
}

// Add task on Enter key
document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});