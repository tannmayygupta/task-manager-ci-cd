document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    // Add task on Enter key
    document.getElementById("taskInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
});

// Add task
function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priorityInput").value;

    const taskText = input.value.trim();
    if (taskText === "") return;

    const tasks = getTasks();

    tasks.push({
        text: taskText,
        completed: false,
        priority: parseInt(priority)
    });

    saveTasks(tasks);
    renderTasks(tasks);

    input.value = "";
}

// Render tasks
function renderTasks(tasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    // Sort by priority (1 = High first)
    tasks.sort((a, b) => a.priority - b.priority);

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) li.classList.add("completed");

        // Add priority class
        if (task.priority === 1) li.classList.add("priority-high");
        if (task.priority === 2) li.classList.add("priority-medium");
        if (task.priority === 3) li.classList.add("priority-low");

        const span = document.createElement("span");
        span.textContent = task.text;

        span.onclick = function () {
            task.completed = !task.completed;
            saveTasks(tasks);
            renderTasks(tasks);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks(tasks);
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Save tasks
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Load tasks
function loadTasks() {
    renderTasks(getTasks());
}

// Clear all
function clearAll() {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
}