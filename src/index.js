// import "./reset.css"
import "./styles.css";
import {
  Task,
  Project,
  taskList,
  projectList,
  findTaskById,
  findProjectById,
  getCompletedTasks,
  getPendingTasks,
  loadFromLocalStorage,
} from "./module.js";


import { emptyData, defaultData } from "./content.js";
import { initializeEventListeners } from "./events.js";

loadFromLocalStorage();


if (taskList.length === 0) {
  emptyData();
} else {
  defaultData();
}

// Initialize event listeners
initializeEventListeners();