const projectList = [];
const taskList = [];
const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

// class to create a task
class Task {
  constructor(
    taskName,
    taskDescription,
    taskDueDate,
    taskPriority,
    taskCompleted = false,
    taskProject = null
  ) {
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.creationDate = new Date();
    this.taskDueDate = taskDueDate;
    this.taskPriority = taskPriority;
    this.id = crypto.randomUUID();
    this.taskCompleted = taskCompleted;
    this.taskProject = taskProject;

    // Automatically add to task list and localStorage
    addTaskToList(this);
    addTaskToLocalStorage(this);

    if (this.taskProject) {
      const project = findProjectById(this.taskProject);
      if (project) {
        addTaskToProject(project, this);
      }
    }
  }
}

// Helper functions for the task class
//add task to the task list
function addTaskToList(task) {
  taskList.push(task);
}

// add task to local storage
function addTaskToLocalStorage(task) {
  try {
    localStorage.setItem(task.id, JSON.stringify(task));
  } catch (error) {
    console.error("Failed to save task to localStorage:", error);
  }
}

function deleteTask(task) {
  if (task.taskProject) {
    const project = findProjectById(task.taskProject);
    if (project) {
      deleteTaskFromProject(project, task);
    }
  }
  taskList.splice(taskList.indexOf(task), 1);
  try {
    localStorage.removeItem(task.id);
  } catch (error) {
    console.error("Failed to remove task from localStorage:", error);
  }
}

function editTask(
  task,
  newName,
  newDescription,
  newDueDate,
  newPriority,
  newCompleted = task.taskCompleted,
  newProject = task.taskProject
) {
  // Handle project change
  if (task.taskProject !== newProject) {
    if (task.taskProject) {
      const oldProject = findProjectById(task.taskProject);
      if (oldProject) {
        deleteTaskFromProject(oldProject, task);
      }
    }
    // Add to new project
    if (newProject) {
      const newProjectObj = findProjectById(newProject);
      if (newProjectObj) {
        addTaskToProject(newProjectObj, task);
      }
    }
  }

  task.taskName = newName;
  task.taskDescription = newDescription;
  task.taskDueDate = newDueDate;
  task.taskPriority = newPriority;
  task.taskCompleted = newCompleted;
  task.taskProject = newProject;
  addTaskToLocalStorage(task); // Update localStorage
}

// Find functions
function findTaskById(id) {
  return taskList.find((task) => task.id === id);
}

// Filter functions
function getCompletedTasks() {
  return taskList.filter((task) => task.taskCompleted);
}
function getPendingTasks() {
  return taskList.filter((task) => !task.taskCompleted);
}

function getTodayTasks() {
  return taskList.filter((task) => {
    return task.taskDueDate && task.taskDueDate === formattedDate;
  });
}

function getOverdueTasks() {
  return taskList.filter((task) => {
    return task.taskDueDate < formattedDate && task.taskDueDate && task.taskCompleted === false;
  });
}

function getThisWeeksTasks() {
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const nextWeekFormatted = nextWeek.toISOString().slice(0, 10);

  return taskList.filter((task) => {
    return task.taskDueDate && task.taskDueDate >= formattedDate && task.taskDueDate <= nextWeekFormatted;
  });
}

function getHighPriorityTasks() {
  return taskList.filter((task) => task.taskPriority === "high");
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

// adding task to project
function addTaskToProject(project, task) {
  project.tasks.push(task);
  addProjectToLocalStorage(project); // Update localStorage
}

// Helper functions for project management
function addProjectToList(project) {
  projectList.push(project);
}

// delete a task from a project
function deleteTaskFromProject(project, task) {
  project.tasks.splice(project.tasks.indexOf(task), 1);
  addProjectToLocalStorage(project); // Update localStorage
}

function removeProjectFromList(project) {
  projectList.splice(projectList.indexOf(project), 1);
}

function addProjectToLocalStorage(project) {
  try {
    localStorage.setItem(project.id, JSON.stringify(project));
  } catch (error) {
    console.error("Failed to save project to localStorage:", error);
  }
}

function removeProjectFromLocalStorage(project) {
  try {
    localStorage.removeItem(project.id);
  } catch (error) {
    console.error("Failed to remove project from localStorage:", error);
  }
}

function findProjectById(id) {
  return projectList.find((project) => project.id === id);
}

function loadFromLocalStorage() {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const itemString = localStorage.getItem(key);

      if (itemString) {
        try {
          const item = JSON.parse(itemString);

          if (item.taskName) {
            // It's a task
            taskList.push(item);
          } else if (item.projectName) {
            // It's a project
            projectList.push(item);
          }
        } catch (parseError) {
          console.error(`Failed to parse item with key ${key}:`, parseError);
        }
      }
    }
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
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
  getTodayTasks,
  getOverdueTasks,
  getThisWeeksTasks,
  getHighPriorityTasks,
  loadFromLocalStorage,
  deleteTask,
  editTask,
  addTaskToProject,
};
