import { Task, Project, taskList, projectList } from "./module.js";
import { addTaskDialog, addProjectDialog } from "./dialog.js";

function initializeEventListeners() {
  // Event delegation for dynamically created elements
  document.addEventListener("click", (event) => {
    // Handle add task button clicks
    if (event.target.matches(".add-task")) {
      addTaskDialog();
    }
    
    // Handle add project button clicks
    if (event.target.matches(".add-project")) {
      addProjectDialog();
    }
    
    // Handle close button clicks in dialogs
    if (event.target.matches(".close")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        dialog.close();
      }
    }

    // Handle save task button clicks
    if (event.target.matches(".save-task")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        const form = dialog.querySelector("form");
        if (form) {
          const formData = new FormData(form);
          const taskName = formData.get("task-name");
          const taskDescription = formData.get("task-description");
          const taskDueDate = formData.get("task-due-date");
          const taskPriority = formData.get("task-priority");
          const taskStatus = formData.get("task-status");
          
          const task = new Task(
            taskName,
            taskDescription,
            taskDueDate,
            taskPriority,
            taskStatus
          );
          dialog.close();
        }
      }
    }

    // Handle save project button clicks
    if (event.target.matches(".save-project")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        const form = dialog.querySelector("form");
        if (form) {
          const formData = new FormData(form);
          const projectName = formData.get("project-name");
          const projectDescription = formData.get("project-description");
          
          const project = new Project(projectName, projectDescription);
          dialog.close();
        }
      }
    }
  });
}

export { initializeEventListeners };