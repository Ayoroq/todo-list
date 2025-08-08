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

import { initializeEventListeners } from "./events.js";
import { renderAll } from "./render.js";

loadFromLocalStorage();

// Render initial content
renderAll();

// Initialize event listeners
initializeEventListeners();