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

//loadFromLocalStorage();

async function initialize() {
  try {
    await initializeDB();
    await loadFromIndexDB();
    // render initial content
    renderAll();
    console.log(projectList)
    console.log(taskList)
  } catch (error) {
    console.error("Failed to initialize application:", error);
    // Fallback: render with empty data
    renderAll();
  }
}

initialize().catch(error => {
  console.error("Initialization failed:", error);
});

// Initialize event listeners
initializeEventListeners();