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
} from "./module.js";
import { addTaskDialog } from "./dialog.js";

import { emptyData, defaultData } from "./content.js";

localStorage.clear();

// Sample tasks for testing
const task1 = new Task(
  "Buy groceries",
  "Milk, eggs, and bread",
  "2025-08-10",
  "High",
  false
);

const task2 = new Task(
  "Complete project proposal",
  "Write the final draft and send to client for review",
  "2025-01-15",
  "High",
  false
);

const task3 = new Task(
  "Schedule dentist appointment",
  "Call Dr. Smith's office to book cleaning appointment",
  "2025-01-20",
  "Medium",
  false
);

const task4 = new Task(
  "Read new book",
  "Finish reading 'The Pragmatic Programmer'",
  "2025-02-01",
  "Low",
  false
);

const task5 = new Task(
  "Update resume",
  "Add recent projects and skills to LinkedIn profile",
  "2025-01-25",
  "Medium",
  false
);

const task6 = new Task(
  "Plan weekend trip",
  "Research hotels and activities for San Francisco trip",
  "2025-01-30",
  "Low",
  true
);

const exampleProject = new Project(
  "Weekly Errands",
  "Tasks for weekly shopping and chores"
);

exampleProject.addTaskToProject(task1);
exampleProject.addTaskToProject(task2);
console.log('Project tasks:', exampleProject.tasks);
console.log('All tasks:', taskList);
console.log('All projects:', projectList);

if (taskList.length === 0) {
  emptyData();
} else {
  defaultData();
}

addTaskDialog();