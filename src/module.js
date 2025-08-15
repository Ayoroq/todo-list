const projectList = [];
const taskList = [];
const today = new Date();
const dbName = "ToDoDatabase";
const dbVersion = 3;
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
    return (
      task.taskDueDate < formattedDate &&
      task.taskDueDate &&
      task.taskCompleted === false
    );
  });
}

function getThisWeeksTasks() {
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const nextWeekFormatted = nextWeek.toISOString().slice(0, 10);

  return taskList.filter((task) => {
    return (
      task.taskDueDate &&
      task.taskDueDate >= formattedDate &&
      task.taskDueDate <= nextWeekFormatted
    );
  });
}

function getHighPriorityTasks() {
  return taskList.filter((task) => task.taskPriority === "high");
}

function searchTasks(query) {
  return taskList.filter(
    (task) =>
      task.taskName.toLowerCase().includes(query.toLowerCase()) ||
      task.taskDescription.toLowerCase().includes(query.toLowerCase())
  );
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
}

// adding task to project
function addTaskToProject(project, task) {
  project.tasks.push(task);
  addProjectToLocalStorage(project); // Update localStorage
}

//function to edit project
function editProject(project, newName, newDescription) {
  project.projectName = newName;
  project.projectDescription = newDescription;
  addProjectToLocalStorage(project); // Update localStorage
}

//function to delete project
function deleteProject(project) {
  // Disassociate tasks from project instead of deleting them
  if (project.tasks.length > 0) {
    project.tasks.forEach((task) => {
      task.taskProject = null;
      addTaskToLocalStorage(task);
    });
  }

  removeProjectFromList(project);
  removeProjectFromLocalStorage(project);
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
    // First, load all items and separate tasks and projects
    const tasks = [];
    const projects = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const itemString = localStorage.getItem(key);

      if (itemString) {
        try {
          const item = JSON.parse(itemString);

          if (item.taskName) {
            tasks.push(item);
          } else if (item.projectName) {
            // Reset tasks array for projects loaded from localStorage
            item.tasks = [];
            projects.push(item);
          }
        } catch (parseError) {
          console.error(`Failed to parse item with key ${key}:`, parseError);
        }
      }
    }

    // Add projects to projectList first
    projects.forEach((project) => projectList.push(project));

    // Add tasks to taskList and rebuild project relationships
    tasks.forEach((task) => {
      taskList.push(task);

      // Rebuild task-project relationships
      if (task.taskProject) {
        const project = findProjectById(task.taskProject);
        if (project) {
          project.tasks.push(task);
        }
      }
    });
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
  }
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
        const objectStore = db.createObjectStore("tasks", { keyPath: "id" });
        objectStore.createIndex("taskName", "taskName", { unique: false });
        objectStore.createIndex("taskDescription", "taskDescription", {
          unique: false,
        });
        objectStore.createIndex("taskDueDate", "taskDueDate", {
          unique: false,
        });
        objectStore.createIndex("taskPriority", "taskPriority", {
          unique: false,
        });
        objectStore.createIndex("taskCompleted", "taskCompleted", {
          unique: false,
        });
        objectStore.createIndex("taskProject", "taskProject", {
          unique: false,
        });
      }
      if (!db.objectStoreNames.contains("projects")) {
        const objectStore = db.createObjectStore("projects", { keyPath: "id" });
        objectStore.createIndex("projectName", "projectName", {
          unique: false,
        });
        objectStore.createIndex("projectDescription", "projectDescription", {
          unique: false,
        });
      }
    };
  });
}

//createItem in the db
function createItemDb(storeName, item) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.add(item);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

//get item in the db
function getItemDb(storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

//edit item in the db
function editItemDb(storeName, item) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put(item);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

//delete item in the db
function deleteItemDb(storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

//get all items in the db
function getAllItemsDb(storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

//clear all items in the db
function clearAllItemsDb(storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

//close the database
function closeDB() {
  if (db) {
    db.close();
    console.log("Database closed");
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
  deleteProject,
  editTask,
  editProject,
  addTaskToProject,
  searchTasks,
};