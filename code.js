// Get references to the input field, add button, and task list 
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Initialize an empty array to store tasks
let tasks = [];

//// Add click event listener to the add task button
addTaskBtn.addEventListener("click", addTask);

// Function to add a task to the task list
function addTask() {
  const taskText = taskInput.value.trim();

  // Check if the input field is not empty, then create a task object and add it to the tasks array
  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    // Add the task to the tasks array and render the updated task list
    tasks.push(task);
    renderTaskList();
    taskInput.value = "";
  }
}

// Function to render the task list
function renderTaskList() {
  const taskHtml = tasks
    .map((task) => {
      return `
            <li class="task-item" data-id="${task.id}">
                <input class="check-box" type="checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <span class="${task.completed ? "completed" : ""}">${
        task.text
      }</span>
                <button class="delete-btn">Delete</button>
            </li>
        `;
    })
    .join("");
  taskList.innerHTML = taskHtml;

  //select all delete buttons and add event listener
  const deleteBtns = taskList.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", deleteTask);
  });

  //select all checkboxes and add event listener
  const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", toggleTaskCompleted);
  });
}

// Function to delete a task from the task list
function deleteTask(e) {
  const taskId = e.target.parentNode.dataset.id;
  tasks = tasks.filter((task) => task.id != taskId);
  renderTaskList();
}

// Function to toggle the completed status of a task
function toggleTaskCompleted(e) {
  const taskId = e.target.parentNode.dataset.id;
  const task = tasks.find((task) => task.id == taskId);
  task.completed = e.target.checked;
  renderTaskList();
}
