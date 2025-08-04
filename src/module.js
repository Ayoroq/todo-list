const crypto = require('crypto');
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
        this.id = crypto.randomUUID()
        this.completed = false;
    }
}

//add task to the task list
function addTaskToList(task) {
    taskList.push(task);
}

// class to create a project
class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.tasks = [];
        this.id = crypto.randomUUID()
    }
}


// adding a new task to a project
function addTaskToProject(project, task) {
    project.tasks.push(task);
}

// add project to the project list
function addProjectToList(project) {
    projectList.push(project);
}

