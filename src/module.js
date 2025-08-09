const projectList = [];
const taskList = [];

// class to create a task
class Task {
  constructor(
    taskName,
    taskDescription,
    taskDueDate,
    taskPriority,
    taskStatus = false
  ) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.creationDate = new Date();
    this.taskDueDate = taskDueDate;
    this.taskPriority = taskPriority;
    this.id = crypto.randomUUID();
    this.taskStatus = taskStatus;

    addTaskToList(this);
    addTaskToLocalStorage(this);
  }
}

// Helper functions for the task class
//add task to the task list
function addTaskToList(task) {
  taskList.push(task);
}

// add task to local storage
function addTaskToLocalStorage(task) {
  localStorage.setItem(task.id, JSON.stringify(task));
}

function deleteTask(task) {
  taskList.splice(taskList.indexOf(task), 1);
  localStorage.removeItem(task.id);
}

function editTask(task,newName, newDescription, newDueDate, newPriority, newStatus) {
  task.taskName = newName;
  task.taskDescription = newDescription;
  task.taskDueDate = newDueDate;
  task.taskPriority = newPriority;
  task.taskStatus = newStatus;
  addTaskToLocalStorage(task); // Update localStorage
}

// Find functions
function findTaskById(id) {
  return taskList.find((task) => task.id === id);
}

// Filter functions
function getCompletedTasks() {
  return taskList.filter((task) => task.taskStatus);
}
function getPendingTasks() {
  return taskList.filter((task) => !task.taskStatus);
}

// project management class
class Project {
  constructor(projectName, projectDescription = "") {
    this.projectName = projectName;
    this.projectDescription = projectDescription;
    this.tasks = [];
    this.id = crypto.randomUUID();
    this.creationDate = new Date();

    // Automatically add to project list and localStorage
    addProjectToList(this);
    addProjectToLocalStorage(this);
  }

  // adding task to project
  addTaskToProject(task) {
    this.tasks.push(task);
  }

  // delete a task from a project
  deleteTaskFromProject(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  // delete project
  delete() {
    removeProjectFromList(this);
    removeProjectFromLocalStorage(this);
  }

  edit(newName) {
    this.projectName = newName || this.projectName;
    addProjectToLocalStorage(this); // Update localStorage
  }
}

// Helper functions for project management
function addProjectToList(project) {
  projectList.push(project);
}

function removeProjectFromList(project) {
  projectList.splice(projectList.indexOf(project), 1);
}

function addProjectToLocalStorage(project) {
  localStorage.setItem(project.id, JSON.stringify(project));
}

function removeProjectFromLocalStorage(project) {
  localStorage.removeItem(project.id);
}

function findProjectById(id) {
  return projectList.find((project) => project.id === id);
}

function loadFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = JSON.parse(localStorage.getItem(key));

    if (item.taskName) {
      // It's a task
      taskList.push(item);
    } else if (item.projectName) {
      // It's a project
      projectList.push(item);
    }
  }
}

export {
  Task,
  Project,
  taskList,
  projectList,
  findTaskById,
  findProjectById,
  getCompletedTasks,
  getPendingTasks,
  loadFromLocalStorage,
  deleteTask,
  editTask,
};
