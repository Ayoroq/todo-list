const projectList = [];
const taskList = [];
const dbName = "ToDoDatabase";
const dbVersion = 3;

function getTodayFormatted() {
  return new Date().toISOString().slice(0, 10);
}

// Input validation function
function validateInput(input, maxLength = 1000) {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

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
    this.taskName = validateInput(taskName, 200);
    this.taskDescription = validateInput(taskDescription, 1000);
    this.creationDate = new Date();
    this.taskDueDate = taskDueDate;
    this.taskPriority = taskPriority;
    this.id = crypto.randomUUID();
    this.taskCompleted = taskCompleted;
    this.taskProject = taskProject;
  }
}

// Helper functions for the task class
//add task to the task list
function addTaskToList(task) {
  taskList.push(task);
  taskList.sort((a, b) => {
    if (!a.taskDueDate && !b.taskDueDate) return 0;
    if (!a.taskDueDate) return 1;
    if (!b.taskDueDate) return -1;
    return new Date(a.taskDueDate) - new Date(b.taskDueDate);
  });
}

function deleteTask(task) {
  if (task.taskProject) {
    const project = findProjectById(task.taskProject);
    if (project) {
      deleteTaskFromProject(project, task);
    }
  }
  const index = taskList.findIndex(t => t.id === task.id);
  if (index > -1) {
    taskList.splice(index, 1);
  }
  deleteItemDb("tasks", task.id).catch((error) => console.error("Failed to delete task from database:", error));
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

  // Update task properties
  task.taskName = validateInput(newName, 200);
  task.taskDescription = validateInput(newDescription, 1000);
  task.taskDueDate = newDueDate;
  task.taskPriority = newPriority;
  task.taskCompleted = newCompleted;
  task.taskProject = newProject;

  // Update task reference in project if it belongs to one
  if (task.taskProject) {
    const project = findProjectById(task.taskProject);
    if (project) {
      const taskIndex = project.tasks.findIndex(t => t.id === task.id);
      if (taskIndex > -1) {
        project.tasks[taskIndex] = task;
        console.log(project.tasks)
        updateProjectInList(project);
      }
    }
  }
  editItemDb("tasks", task).catch((error) => console.error("Failed to update task in database:", error));
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
  const todayFormatted = getTodayFormatted();
  return taskList.filter((task) => {
    return task.taskDueDate && task.taskDueDate === todayFormatted;
  });
}

function getOverdueTasks() {
  const todayFormatted = getTodayFormatted();
  return taskList.filter((task) => {
    return (
      task.taskDueDate &&
      task.taskDueDate < todayFormatted &&
      !task.taskCompleted
    );
  });
}

function getThisWeeksTasks() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const todayFormatted = getTodayFormatted();
  const nextWeekFormatted = nextWeek.toISOString().slice(0, 10);

  return taskList.filter((task) => {
    return (
      task.taskDueDate &&
      task.taskDueDate >= todayFormatted &&
      task.taskDueDate <= nextWeekFormatted
    );
  });
}

function getHighPriorityTasks() {
  return taskList.filter((task) => task.taskPriority === "high");
}

function searchTasks(query) {
  const lowerQuery = query.toLowerCase();
  return taskList.filter(
    (task) =>
      task.taskName?.toLowerCase().includes(lowerQuery) ||
      task.taskDescription?.toLowerCase().includes(lowerQuery)
  );
}

// project management class
class Project {
  constructor(projectName, projectDescription = "") {
    this.projectName = validateInput(projectName, 100);
    this.projectDescription = validateInput(projectDescription, 500);
    this.tasks = [];
    this.id = crypto.randomUUID();
    this.creationDate = new Date();
  }
}

// adding task to project
function addTaskToProject(project, task) {
  project.tasks.push(task);
  updateProjectInList(project);
  editItemDb("projects", project).catch((error) => console.error("Failed to update project in database:", error));
}

// delete a task from a project
function deleteTaskFromProject(project, task) {
  const index = project.tasks.findIndex(t => t.id === task.id);
  if (index > -1) {
    project.tasks.splice(index, 1);
  }
  updateProjectInList(project);
  editItemDb("projects", project).catch((error) => console.error("Failed to update project in database:", error));
}

//function to edit project
function editProject(project, newName, newDescription) {
  project.projectName = validateInput(newName, 100);
  project.projectDescription = validateInput(newDescription, 500);
  updateProjectInList(project);
  editItemDb("projects", project).catch((error) => console.error("Failed to update project in database:", error));
}

//function to delete project
async function deleteProject(project) {
  // Disassociate tasks from project instead of deleting them
  if (project.tasks.length > 0) {
    await Promise.all(
      project.tasks.map((task) => {
        const index = taskList.findIndex(t => t.id === task.id);
        if (index > -1) {
          taskList[index].taskProject = null;
        }
        return editItemDb("tasks", task).catch((error) => console.error("Failed to update task in database:", error));
      })
    );
  }

  removeProjectFromList(project);
  deleteItemDb("projects", project.id).catch((error) => console.error("Failed to delete project from database:", error));
}

// Helper functions for project management
function addProjectToList(project) {
  projectList.push(project);
}

function removeProjectFromList(project) {
  const index = projectList.findIndex(p => p.id === project.id);
  if (index > -1) {
    projectList.splice(index, 1);
  }
}

function findProjectById(id) {
  return projectList.find((project) => project.id === id);
}

function updateProjectInList(project) {
  const projectIndex = projectList.findIndex(p => p.id === project.id);
  if (projectIndex > -1) {
    projectList[projectIndex] = project;
  }
  editItemDb("projects", project).catch((error) => console.error("Failed to update project in database:", error));
}

// function to help sort the tasks
function sortTasks(tasks, sortBy="dueDate", sortOrder="asc"){
  if (sortBy === "dueDate") {
    tasks.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.taskDueDate) - new Date(b.taskDueDate);
      } else {
        return new Date(b.taskDueDate) - new Date(a.taskDueDate);
      }
    });
  } else if (sortBy === "priority") {
    const priorityOrder = {
      "low": 1,
      "medium": 2,
      "high": 3
    };
    tasks.sort((a, b) => {
      if (sortOrder === "asc") {
        return priorityOrder[a.taskPriority] - priorityOrder[b.taskPriority];
      } else {
        return priorityOrder[b.taskPriority] - priorityOrder[a.taskPriority];
      }
    });
  }
  return tasks;
}

// Let us open our database
let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error("Error opening database:", event.target.error);
      reject(event.target.error);
    };

    request.onupgradeneeded = function (event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("projects")) {
        db.createObjectStore("projects", { keyPath: "id" });
      }
    };
  });
}

function dbRequest(storeName, mode, action, ...args) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }
    const transaction = db.transaction(storeName, mode);
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore[action](...args);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.onerror = () => reject(transaction.error);
  });
}
//createItem in the db
function createItemDb(storeName, item) {
  return dbRequest(storeName, "readwrite", "add", item);
}

//get item in the db
function getItemDb(storeName, id) {
  return dbRequest(storeName, "readonly", "get", id);
}

//edit item in the db
function editItemDb(storeName, item) {
  return dbRequest(storeName, "readwrite", "put", item);
}

//delete item in the db
function deleteItemDb(storeName, id) {
  return dbRequest(storeName, "readwrite", "delete", id);
}

//get all items in the db
function getAllItemsDb(storeName) {
  return dbRequest(storeName, "readonly", "getAll");
}

//close the database
function closeDB() {
  if (db) {
    db.close();
    console.info("Database closed");
  }
}

async function loadFromIndexDB() {
  try {
    const tasks = await getAllItemsDb("tasks");
    const projects = await getAllItemsDb("projects");

    // Add projects to projectList first
    projects.forEach((project) => projectList.push(project));

    // Add tasks to taskList
    tasks.forEach((task) => {
      taskList.push(task);

    });
  } catch (error) {
    console.error("Failed to load from indexDB:", error);
  }
}

function createTask(
  taskName,
  taskDescription,
  taskDueDate,
  taskPriority,
  taskCompleted = false,
  taskProject = null
) {
  const task = new Task(
    taskName,
    taskDescription,
    taskDueDate,
    taskPriority,
    taskCompleted,
    taskProject
  );
  addTaskToList(task);
  createItemDb("tasks", task).catch((error) =>
    console.error("Failed to create task in database:", error)
  );

  if (task.taskProject) {
    const project = findProjectById(task.taskProject);
    if (project) {
      addTaskToProject(project, task);
    }
  }
  return task;
}

function createProject(projectName, projectDescription = "") {
  const project = new Project(projectName, projectDescription);
  addProjectToList(project);
  createItemDb("projects", project).catch((error) =>
    console.error("Failed to create project in database:", error)
  );
  return project;
}

async function initializeDB() {
  try {
    await openDB();
    console.info("Database opened successfully");
    return true;
  } catch (error) {
    console.error("Failed to open database:", error);
    return false;
  }
}

export {
  Task,
  Project,
  createTask,
  createProject,
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
  loadFromIndexDB,
  initializeDB,
  deleteTask,
  deleteProject,
  editTask,
  editProject,
  addTaskToProject,
  searchTasks,
};