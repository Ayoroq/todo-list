import { taskList, projectList } from "./module.js";

function renderTasks() {
  const mainContainer = document.querySelector(".main");

  // Clear existing content
  mainContainer.innerHTML = "";
  const header = document.createElement("h2");
  header.textContent = "All Tasks";
  mainContainer.appendChild(header);


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
  taskCard.dataset.taskId = task.id;
  taskCard.innerHTML = `
    <div class="task-header">
          <input type="checkbox" class="task-checkbox" ${
            task.taskCompleted ? "checked" : ""
          }>
          <h3 class="task-name">${task.taskName}</h3>
          <div class="task-actions">
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
          </div>
        </div>
        <div class="task-body">
          <p class="task-description">${task.taskDescription}</p>
          <div class="task-meta">
            <span class="task-priority priority-${task.taskPriority.toLowerCase()}">${
    task.taskPriority
  }</span>
            <span class="task-due-date">${task.taskDueDate}</span>
          </div>
        </div>
  `;
  return taskCard;
}

function renderProjects() {
  const projectFilter = document.querySelector(".project-filter");

  // Remove only project buttons, keep "All" button
  const projectButtons = projectFilter.querySelectorAll("button:not([data-project-id='all'])");
  projectButtons.forEach(button => button.remove());

  // Add each project as a button and also as an option in the add task form
  if (projectList.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No projects available.";
    projectFilter.appendChild(emptyMessage);
    return;
  }
  projectList.forEach((project) => {
    const projectBtn = document.createElement("button");
    projectBtn.textContent = project.projectName;
    projectBtn.dataset.projectId = project.id;
    projectFilter.appendChild(projectBtn);
  });
}

function renderProjectTasks(project) {
  const mainContainer = document.querySelector(".main");

  // Clear existing content
  mainContainer.innerHTML = "";
  const ProjectName = document.createElement("h2");
  ProjectName.textContent = project.projectName;
  mainContainer.appendChild(ProjectName);

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
  const mainContainer = document.querySelector(".main");

  // Clear existing content
  mainContainer.innerHTML = "";
  const header = document.createElement("h2");
  header.textContent = `${filter} Tasks`;
  mainContainer.appendChild(header);

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

export { renderTasks, renderProjects, renderAll, renderProjectTasks, renderTasksByFilter };
