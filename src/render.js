import { taskList, projectList } from "./module.js";

function renderTasks() {
  const mainContainer = document.querySelector(".main");
  
  // Clear existing content
  mainContainer.innerHTML = "";
  
  // Render each task
  if (taskList.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks available.";
    mainContainer.appendChild(emptyMessage);
    return;
  }
  taskList.forEach(task => {
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
          <input type="checkbox" class="task-checkbox">
          <h3 class="task-name">${task.taskName}</h3>
          <div class="task-actions">
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
          </div>
        </div>
        <div class="task-body">
          <p class="task-description">${task.taskDescription}</p>
          <div class="task-meta">
            <span class="task-priority priority-${task.taskPriority.toLowerCase()}">${task.taskPriority}</span>
            <span class="task-due-date">${task.taskDueDate}</span>
          </div>
        </div>
  `;
  
  return taskCard;
}

function renderProjects() {
  const projectFilter = document.querySelector(".project-filter");
  
  // Clear existing projects (keep "All" button)
  const allButton = projectFilter.querySelector('button');
  projectFilter.innerHTML = '';
  projectFilter.appendChild(allButton);
  
  // Add each project as a button
  projectList.forEach(project => {
    const projectBtn = document.createElement("button");
    projectBtn.textContent = project.projectName;
    projectBtn.dataset.projectId = project.id;
    projectFilter.appendChild(projectBtn);
  });
}

function renderAll() {
  renderTasks();
  renderProjects();
}

export { renderTasks, renderProjects, renderAll };