import {
  Task,
  Project,
  taskList,
  projectList,
  findTaskById,
  deleteTask,
  editTask,
} from "./module.js";
import { addTaskDialog, addProjectDialog, editTaskDialog } from "./dialog.js";
import { renderTasks, renderProjects, renderAll, renderProjectTasks } from "./render.js";

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
        dialog.remove();
      }
    }

    // Handle save task button clicks
    if (event.target.matches(".save-task")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        const form = dialog.querySelector("form");
        if (form.checkValidity()) {
          const formData = new FormData(form);
          const taskName = formData.get("task-name");
          const taskDescription = formData.get("task-description");
          const taskDueDate = formData.get("task-due-date");
          const taskPriority = formData.get("task-priority");
          const taskCompleted = formData.get("task-completed") === "on";
          const taskProject = formData.get("task-project");

          const task = new Task(
            taskName,
            taskDescription,
            taskDueDate,
            taskPriority,
            taskCompleted,
            taskProject
          );

          // Re-render tasks to show the new task
          renderTasks();
          dialog.close();
          dialog.remove();
        }
      }
    }

    // Handle save project button clicks
    if (event.target.matches(".save-project")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        const form = dialog.querySelector("form");
        if (form.checkValidity()) {
          const formData = new FormData(form);
          const projectName = formData.get("project-name");
          const projectDescription = formData.get("project-description");

          const project = new Project(projectName, projectDescription);

          // Re-render projects to show the new project
          renderProjects();
          dialog.close();
          dialog.remove();
        }
      }
    }

    //handle delete task button clicks
    if (event.target.matches(".delete-btn")) {
      const taskCard = event.target.closest(".task-card");
      const taskId = taskCard.dataset.taskId;
      const task = findTaskById(taskId);
      if (task) {
        deleteTask(task);
        renderTasks();
      }
    }
  });

  //handles the edit button clicks
  document.addEventListener("click", (event) => {
    if (event.target.matches(".edit-btn")) {
      const taskCard = event.target.closest(".task-card");
      const taskId = taskCard.dataset.taskId;
      const task = findTaskById(taskId);
      if (task) {
        editTaskDialog(task);
      }
    }
  });

  // handles the save on the edit task
  document.addEventListener("click", (event) => {
    if (event.target.matches(".save-edit-task")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        const form = dialog.querySelector("form");
        if (form.checkValidity()) {
          const formData = new FormData(form);
          const newName = formData.get("task-name");
          const newDescription = formData.get("task-description");
          const newDueDate = formData.get("task-due-date");
          const newPriority = formData.get("task-priority");
          const taskId = formData.get("task-id");
          const newCompleted = formData.get("task-completed") === "on";
          const newProject = formData.get("task-project");

          const task = findTaskById(taskId);
          if (task) {
            editTask(
              task,
              newName,
              newDescription,
              newDueDate,
              newPriority,
              newCompleted,
              newProject
            );
            renderTasks();
            dialog.close();
            dialog.remove();
          }
        }
      }
    }
  });

  //handling when an item is marked as completed
  document.addEventListener("change", (event) => {
    if (event.target.matches(".task-checkbox")) {
      const taskCard = event.target.closest(".task-card");
      const taskId = taskCard.dataset.taskId;
      const task = findTaskById(taskId);
      if (task) {
        const newCompleted = !task.taskCompleted;
        editTask(
          task,
          task.taskName,
          task.taskDescription,
          task.taskDueDate,
          task.taskPriority,
          newCompleted,
          task.taskProject
        );
        taskCard.classList.toggle("completed", newCompleted);
      }
    }
  });

  // handling the filtering of the project when the button is clicked
  document.addEventListener("click", (event) => {
    if (event.target.matches(".project-filter button")) {
      const projectId = event.target.dataset.projectId;
      if (projectId === "all") {
        renderTasks();
        return;
      }
      const project = projectList.find((p) => p.id === projectId);
      if (project) {
        renderProjectTasks(project);
      }
    }
  })
}

export { initializeEventListeners };
