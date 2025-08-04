const crypto = require("crypto");
const projectList = [];
const taskList = [];

// class to create a task
class Task {
  constructor(taskName, taskDescription, taskDueDate, taskPriority) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.creationDate = new Date();
    this.taskDueDate = taskDueDate;
    this.taskPriority = taskPriority;
    this.id = crypto.randomUUID();
    this.completed = false;

    addTaskToList(this);
    addTaskToLocalStorage(this);
  }

  delete() {
    deleteTask(this);
  }

  complete() {
    this.completed = true;
  }
  uncomplete() {
    this.completed = false;
  }
}

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

// project management class
class Project {
  constructor(projectName) {
    this.projectName = projectName;
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