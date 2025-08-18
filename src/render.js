import { taskList, projectList, searchTasks } from "./module.js";
import sortImage from "/assets/sort.svg";

// DOM elements
const mainContainer = document.querySelector(".main");
const header = document.querySelector(".header");
const projectFilter = document.querySelector(".project-filter");

function createSortDropdown() {
  const sortDropdown = document.createElement("div");
  sortDropdown.className = "sort-dropdown";

  const dropdownToggle = document.createElement("button");
  dropdownToggle.className = "dropdown-toggle";
  const buttonText = document.createElement("span");
  buttonText.textContent = "Sort Tasks";
  buttonText.className = "dropdown-text";
  dropdownToggle.appendChild(buttonText);
  const sortImg = document.createElement("img");
  sortImg.src = sortImage;
  sortImg.alt = "Image of the sort button";
  dropdownToggle.appendChild(sortImg);
  const dropdownContent = document.createElement("div");
  dropdownContent.className = "sort-dropdown-content";
  dropdownContent.classList.add("hidden");

  const sortOptions = [
    { text: "Due Date Ascending", value: "due-date" },
    { text: "Due Date Descending", value: "due-date-desc" },
    { text: "Low to High Priority", value: "priority-asc" },
    { text: "High to Low Priority", value: "priority-desc" },
  ];

  sortOptions.forEach((option) => {
    const button = document.createElement("button");
    button.className = "sort-option";
    button.dataset.sort = option.value;
    button.textContent = option.text;
    dropdownContent.appendChild(button);
  });

  sortDropdown.appendChild(dropdownToggle);
  sortDropdown.appendChild(dropdownContent);

  return sortDropdown;
}

function renderTasks() {
  // Clear existing content
  mainContainer.textContent = "";
  header.textContent = "";
  const headerText = document.createElement("h2");
  headerText.textContent = "All Tasks";
  header.appendChild(headerText);
  header.appendChild(createSortDropdown());

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

  // Create task header
  const taskHeader = document.createElement("div");
  taskHeader.className = "task-header";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.taskCompleted;
  taskHeader.appendChild(checkbox);

  // Create task body
  const taskBody = document.createElement("div");
  taskBody.className = "task-body";

  const taskName = document.createElement("h3");
  taskName.className = "task-name";
  taskName.textContent = task.taskName;

  const taskDescription = document.createElement("p");
  taskDescription.className = "task-description";
  taskDescription.textContent = task.taskDescription;

  const taskMeta = document.createElement("div");
  taskMeta.className = "task-meta";

  const priority = document.createElement("span");
  priority.className = `task-priority priority-${task.taskPriority?.toLowerCase()}`;
  priority.textContent = task.taskPriority;

  const dueDate = document.createElement("span");
  dueDate.className = "task-due-date";
  dueDate.textContent = task.taskDueDate;

  taskMeta.appendChild(priority);
  taskMeta.appendChild(dueDate);
  taskBody.appendChild(taskName);
  taskBody.appendChild(taskDescription);
  taskBody.appendChild(taskMeta);

  // Create task actions
  const taskActions = document.createElement("div");
  taskActions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.innerHTML = "&#9998";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "🗑️";

  taskActions.appendChild(editBtn);
  taskActions.appendChild(deleteBtn);

  taskCard.appendChild(taskHeader);
  taskCard.appendChild(taskBody);
  taskCard.appendChild(taskActions);

  return taskCard;
}

function renderProjects() {
  projectFilter.textContent = "";

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

    const projectBtn = document.createElement("button");
    projectBtn.className = "project-btn";
    projectBtn.textContent = project.projectName;

    const projectActions = document.createElement("div");
    projectActions.className = "project-actions";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.className = "add-task-btn";
    addTaskBtn.innerHTML = "&#x2b";

    const editProjectBtn = document.createElement("button");
    editProjectBtn.className = "edit-project-btn";
    editProjectBtn.innerHTML = "&#9998";

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.className = "delete-project-btn";
    deleteProjectBtn.textContent = "🗑️";

    projectActions.appendChild(addTaskBtn);
    projectActions.appendChild(editProjectBtn);
    projectActions.appendChild(deleteProjectBtn);

    projectContainer.appendChild(projectBtn);
    projectContainer.appendChild(projectActions);

    projectFilter.appendChild(projectContainer);
  });
}

function renderProjectTasks(project) {
  // Clear existing content
  mainContainer.textContent = "";
  header.textContent = "";
  const container = document.createElement("div");
  container.className = "project-tasks-container";
  header.appendChild(container);

  // Render project name and description
  const projectName = document.createElement("h2");
  const projectDescription = document.createElement("p");
  projectName.className = "project-name";
  projectDescription.className = "project-description";
  projectName.textContent = project.projectName;
  projectDescription.textContent = project.projectDescription || "No description available.";
  container.appendChild(projectName);
  container.appendChild(projectDescription);
  header.appendChild(createSortDropdown());

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
  mainContainer.textContent = "";
  header.textContent = "";
  const headerText = document.createElement("h2");
  headerText.textContent = `${filter} Tasks`;
  header.appendChild(headerText);
  header.appendChild(createSortDropdown());

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
