import { projectList, findProjectById } from "./module.js";

const body = document.body;
function taskDialog(task = null) {
  const isEdit = task !== null;
  const dialog = document.createElement("dialog");
  dialog.classList.add(isEdit ? "edit-task-dialog" : "add-task-dialog");
  dialog.setAttribute("closedby", "closerequest");

  const form = document.createElement("form");
  form.className = "task-form";
  form.method = "dialog";

  const h2 = document.createElement("h2");
  h2.textContent = isEdit ? "Edit Task" : "Add New Task";
  form.appendChild(h2);

  // Task name
  const nameP = document.createElement("p");
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "task-name");
  nameLabel.className = "visually-hidden";
  nameLabel.textContent = "Task Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "task-name";
  nameInput.className = "task-name";
  nameInput.placeholder = "Task Name";
  nameInput.id = "task-name";
  nameInput.required = true;
  if (isEdit) nameInput.value = task.taskName;
  nameP.appendChild(nameLabel);
  nameP.appendChild(nameInput);
  form.appendChild(nameP);

  // Task description
  const descP = document.createElement("p");
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", "task-description");
  descLabel.className = "visually-hidden";
  descLabel.textContent = "Task Description";
  const descTextarea = document.createElement("textarea");
  descTextarea.name = "task-description";
  descTextarea.className = "task-description";
  descTextarea.placeholder = "Task Description";
  descTextarea.id = "task-description";
  if (isEdit) descTextarea.value = task.taskDescription;
  descP.appendChild(descLabel);
  descP.appendChild(descTextarea);
  form.appendChild(descP);

  // Priority
  const priorityP = document.createElement("p");
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "task-priority");
  priorityLabel.textContent = "Choose a priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.name = "task-priority";
  prioritySelect.className = "task-priority";
  prioritySelect.id = "task-priority";
  
  const priorities = [{value: "high", text: "High"}, {value: "medium", text: "Medium"}, {value: "low", text: "Low"}];
  priorities.forEach(p => {
    const option = document.createElement("option");
    option.value = p.value;
    option.textContent = p.text;
    if (isEdit && task.taskPriority === p.value) option.selected = true;
    prioritySelect.appendChild(option);
  });
  priorityP.appendChild(priorityLabel);
  priorityP.appendChild(prioritySelect);
  form.appendChild(priorityP);

  // Due date
  const dateP = document.createElement("p");
  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "task-due-date");
  dateLabel.textContent = "Task Due date";
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "task-due-date";
  dateInput.className = "task-due-date";
  dateInput.id = "task-due-date";
  if (isEdit) dateInput.value = task.taskDueDate;
  dateP.appendChild(dateLabel);
  dateP.appendChild(dateInput);
  form.appendChild(dateP);

  // Project
  const projectP = document.createElement("p");
  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "task-project");
  projectLabel.textContent = "Add to Project";
  const projectSelect = document.createElement("select");
  projectSelect.name = "task-project";
  projectSelect.className = "task-project";
  projectSelect.id = "task-project";
  const noProjectOption = document.createElement("option");
  noProjectOption.value = "";
  noProjectOption.textContent = "No Project";
  projectSelect.appendChild(noProjectOption);
  projectP.appendChild(projectLabel);
  projectP.appendChild(projectSelect);
  form.appendChild(projectP);

  // Hidden ID for edit
  if (isEdit) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "task-id";
    hiddenInput.value = task.id;
    form.appendChild(hiddenInput);
  }

  // Buttons
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "dialog-buttons";
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "close";
  cancelBtn.textContent = "Cancel";
  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.className = isEdit ? "save-edit-task" : "save-task";
  saveBtn.textContent = isEdit ? "Update" : "Save";
  buttonsDiv.appendChild(cancelBtn);
  buttonsDiv.appendChild(saveBtn);
  form.appendChild(buttonsDiv);

  dialog.appendChild(form);

  body.appendChild(dialog);
  dialog.showModal();

  // Populate projects dropdown
  projectList.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.projectName;
    option.selected = isEdit && task.taskProject === project.id;
    projectSelect.appendChild(option);
  });
}

// Convenience functions
function addTaskDialog() {
  taskDialog();
}

function editTaskDialog(task) {
  taskDialog(task);
}

function projectDialog(project = null) {
  const isEdit = project !== null;
  const dialog = document.createElement("dialog");
  dialog.classList.add(isEdit ? "edit-project-dialog" : "add-project-dialog");
  dialog.setAttribute("closedby", "closerequest");

  const form = document.createElement("form");
  form.className = "project-form";
  form.method = "dialog";

  const h2 = document.createElement("h2");
  h2.textContent = isEdit ? "Edit Project" : "Add New Project";
  form.appendChild(h2);

  // Project name
  const nameP = document.createElement("p");
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "project-name");
  nameLabel.className = "visually-hidden";
  nameLabel.textContent = "Project Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "project-name";
  nameInput.className = "project-name";
  nameInput.placeholder = "Project Name";
  nameInput.id = "project-name";
  nameInput.required = true;
  if (isEdit) nameInput.value = project.projectName;
  nameP.appendChild(nameLabel);
  nameP.appendChild(nameInput);
  form.appendChild(nameP);

  // Project description
  const descP = document.createElement("p");
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", "project-description");
  descLabel.className = "visually-hidden";
  descLabel.textContent = "Project Description";
  const descTextarea = document.createElement("textarea");
  descTextarea.name = "project-description";
  descTextarea.className = "project-description";
  descTextarea.placeholder = "Project Description";
  descTextarea.id = "project-description";
  if (isEdit) descTextarea.value = project.projectDescription;
  descP.appendChild(descLabel);
  descP.appendChild(descTextarea);
  form.appendChild(descP);

  // Hidden ID for edit
  if (isEdit) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "project-id";
    hiddenInput.value = project.id;
    form.appendChild(hiddenInput);
  }

  // Buttons
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "dialog-buttons";
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "close";
  cancelBtn.textContent = "Cancel";
  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.className = isEdit ? "save-edit-project" : "save-project";
  saveBtn.textContent = isEdit ? "Update" : "Save";
  buttonsDiv.appendChild(cancelBtn);
  buttonsDiv.appendChild(saveBtn);
  form.appendChild(buttonsDiv);

  dialog.appendChild(form);

  body.appendChild(dialog);
  dialog.showModal();
}

// Convenience functions
function addProjectDialog() {
  projectDialog();
}

function editProjectDialog(project) {
  projectDialog(project);
}

export {
  addTaskDialog,
  addProjectDialog,
  editTaskDialog,
  editProjectDialog,
  taskDialog,
  projectDialog,
};
