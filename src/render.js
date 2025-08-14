import { taskList, projectList, searchTasks } from "./module.js";

// DOM elements
const mainContainer = document.querySelector(".main");
const header = document.querySelector(".header");
const projectFilter = document.querySelector(".project-filter");

function renderTasks() {
  // Clear existing content
  mainContainer.innerHTML = "";
  header.innerHTML = "";
  const headerText = document.createElement("h2");
  headerText.textContent = "All Tasks";
  header.appendChild(headerText);

  // Render each task
  if (taskList.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks available.";
    mainContainer.appendChild(emptyMessage);
    return;
  }
  taskList.forEach((task) => {
    const taskCard = createTaskCard(task);
    mainContainer.appendChild(taskCard);
  });
}

function createTaskCard(task) {
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";
  taskCard.classList.toggle("completed", task.taskCompleted);
  taskCard.dataset.taskId = task.id;
  taskCard.innerHTML = `
    <div class="task-header">
      <input type="checkbox" class="task-checkbox" ${
        task.taskCompleted ? "checked" : ""
      }>
    </div>
    <div class="task-body">
      <h3 class="task-name">${task.taskName}</h3>
      <p class="task-description">${task.taskDescription}</p>
      <div class="task-meta">
        <span class="task-priority priority-${task.taskPriority.toLowerCase()}">${
    task.taskPriority
  }</span>
        <span class="task-due-date">${task.taskDueDate}</span>
      </div>
    </div>
    <div class="task-actions">
      <button class="edit-btn">&#9998</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;
  return taskCard;
}

function renderProjects() {
  projectFilter.innerHTML = "";

  // Add each project as a button and also as an option in the add task form
  if (projectList.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No projects available.";
    projectFilter.appendChild(emptyMessage);
    return;
  }
  projectList.forEach((project) => {
    const projectContainer = document.createElement("div");
    projectContainer.className = "project-container";
    projectContainer.dataset.projectId = project.id;
    projectContainer.innerHTML = `
      <button class="project-btn">${project.projectName}</button>
      <div class="project-actions">
        <button class="add-task-btn">&#x2b</button>
        <button class="edit-project-btn">&#9998</button>
        <button class="delete-project-btn">🗑️</button>
      </div>
    `;
    projectFilter.appendChild(projectContainer);
  });
}

function renderProjectTasks(project) {
  // Clear existing content
  mainContainer.innerHTML = "";
  header.innerHTML = "";
  const ProjectName = document.createElement("h2");
  ProjectName.textContent = project.projectName;
  header.appendChild(ProjectName);

  // Render each task
  if (project.tasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks available in this project.";
    mainContainer.appendChild(emptyMessage);
    return;
  }
  project.tasks.forEach((task) => {
    const taskCard = createTaskCard(task);
    mainContainer.appendChild(taskCard);
  });
}

function renderTasksByFilter(filter, tasks) {
  // Clear existing content
  mainContainer.innerHTML = "";
  header.innerHTML = "";
  const headerText = document.createElement("h2");
  headerText.textContent = `${filter} Tasks`;
  header.appendChild(headerText);

  // Render each task
  if (tasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks available.";
    mainContainer.appendChild(emptyMessage);
    return;
  }
  tasks.forEach((task) => {
    const taskCard = createTaskCard(task);
    mainContainer.appendChild(taskCard);
  });
}

function renderAll() {
  renderTasks();
  renderProjects();
}

export {
  renderTasks,
  renderProjects,
  renderAll,
  renderProjectTasks,
  renderTasksByFilter,
};
