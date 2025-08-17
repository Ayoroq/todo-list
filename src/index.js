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
  getTodayTasks,
  getOverdueTasks,
  getThisWeeksTasks,
  getHighPriorityTasks,
  initializeDB,
  loadFromIndexDB,
} from "./module.js";

import { initializeEventListeners } from "./events.js";
import { renderAll } from "./render.js";

async function initialize() {
  try {
    await initializeDB();
    await loadFromIndexDB();
    console.log(projectList)
    console.log(taskList)
    renderAll();
    initializeEventListeners();
  } catch (error) {
    console.error("Failed to initialize application:", error?.message || "Unknown error");
    renderAll();
    initializeEventListeners();
  }
}

initialize();