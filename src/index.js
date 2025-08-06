import "./reset.css";
import "./style.css";
import {
  Task,
  Project,
  taskList,
  projectList,
  findTaskById,
  findProjectById,
  getCompletedTasks,
  getPendingTasks,
} from "./module.js";
localStorage.clear();

const exampleTask = new Task(
  "Buy groceries",
  "Milk, eggs, and bread",
  "2025-08-10",
  "High",
  false
);

const exampleProject = new Project(
  "Weekly Errands",
  "Tasks for weekly shopping and chores"
);

exampleProject.addTaskToProject(exampleTask);
console.log(exampleProject.tasks);
console.log(exampleProject);
