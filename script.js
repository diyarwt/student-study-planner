const taskInput = document.getElementById("taskInput");
const subjectInput = document.getElementById("subjectInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const progress = document.getElementById("progress");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

// Add a new task
addButton.addEventListener("click", function () {

    const taskName = taskInput.value.trim();
    const subjectName = subjectInput.value;

    if (taskName === "" || subjectName === "") {
        alert("Please enter a task and select a subject!");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        subject: subjectName,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";
    subjectInput.value = "";

    displayTasks();
});

// Save tasks in browser
function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");
        li.className = "task-item";

        const info = document.createElement("div");
        info.className = "task-info";

        if (task.completed) {
            info.classList.add("done");
        }

        const name = document.createElement("strong");
        name.textContent = task.name;

        const subject = document.createElement("small");
        subject.textContent = task.subject;

        info.appendChild(name);
        info.appendChild(subject);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed ? "Undo" : "Done";

        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        li.appendChild(info);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateStatistics();
}

// Update statistics
function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    progress.textContent = percentage + "%";
}

// Show previously saved tasks
displayTasks();