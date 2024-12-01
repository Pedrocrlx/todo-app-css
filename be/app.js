let tasks = [];
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const addTaskModal = document.getElementById("addTaskModal");
const overlay = document.getElementById("overlay");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const closeModalBtn = document.getElementById("closeModalBtn");

let filteredTasks = [...tasks];

const themeToggleButton = document.getElementById('themeToggle');
const body = document.body;

// Theme toggle functionality
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggleButton.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Filter tasks based on search input
function filterTasks() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    filteredTasks = tasks.filter(task => task.description.toLowerCase().includes(searchTerm));
    renderTasks();
}

// Render task list
function renderTasks() {
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
        if (!task || !task.description) return;

        const taskItem = document.createElement("li");
        taskItem.className = "task";
        if (task.completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
            <span>${task.description}</span>
            <button onclick="removeTask(${index})">Remove</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add a new task
function addTask(event) {
    event.preventDefault();
    
    const taskDescription = taskInput.value.trim();
    if (!taskDescription) {
        alert("Task cannot be empty!");
        return;
    }

    // Check for duplicates
    if (tasks.some(task => task.description.toLowerCase() === taskDescription.toLowerCase())) {
        alert("Task already exists!");
        return;
    }

    tasks.push({ description: taskDescription, completed: false });
    taskInput.value = "";
    renderTasks();
    filterTasks();
    closeModal();
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    filterTasks();
}

// Remove a task
function removeTask(index) {
    tasks.splice(index, 1);
    filterTasks();
}

// Show modal
function showModal() {
    addTaskModal.style.display = "block";
    overlay.style.display = "block";
}

// Close modal
function closeModal() {
    addTaskModal.style.display = "none";
    overlay.style.display = "none";
}

// Event listeners
addTaskBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
taskForm.addEventListener("submit", addTask);

renderTasks();
