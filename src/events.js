import {
  Task,
  Project,
  taskList,
  projectList,
  findTaskById,
  deleteTask,
  editTask,
  editProject,
  findProjectById,
  getTodayTasks,
  getCompletedTasks,
  getOverdueTasks,
  getThisWeeksTasks,
  getHighPriorityTasks,
  searchTasks,
  deleteProject,
} from "./module.js";
import { escapeHtml } from "./utils.js";
import {
  addTaskDialog,
  addProjectDialog,
  editTaskDialog,
  editProjectDialog,
} from "./dialog.js";
import {
  renderTasks,
  renderProjects,
  renderAll,
  renderProjectTasks,
  renderTasksByFilter,
} from "./render.js";

// Helper functions for repeated code
function closeDialog(dialog) {
  dialog.close();
  dialog.remove();
}

function processForm(dialog, callback) {
  try {
    const form = dialog.querySelector("form");
    if (form && form.checkValidity()) {
      const formData = new FormData(form);
      callback(formData);
      closeDialog(dialog);
    }
  } catch (error) {
    console.error("Error processing form:", error.message);
  }
}

function getProjectFromContainer(element) {
  try {
    const container = element.closest(".project-container");
    if (!container || !container.dataset.projectId) return null;
    const projectId = container.dataset.projectId;
    return projectList.find((p) => p.id === projectId);
  } catch (error) {
    console.error("Error getting project from container:", error.message);
    return null;
  }
}

const filterMap = {
  all: () => renderAll(),
  today: () => renderTasksByFilter("Today's", getTodayTasks()),
  completed: () => renderTasksByFilter("Completed", getCompletedTasks()),
  overdue: () => renderTasksByFilter("Overdue", getOverdueTasks()),
  "this-week": () => renderTasksByFilter("This Week's", getThisWeeksTasks()),
  "high-priority": () =>
    renderTasksByFilter("High Priority", getHighPriorityTasks()),
};

function Same() {
  const active = document.querySelector(".active");
  // Then check if it's a task filter or project button
  const isTaskFilter = active?.closest(".task-filter");
  const isProject = active?.classList.contains("project-btn");
  if (isTaskFilter) {
    const filterType = active.getAttribute("data-filter");
    if (filterMap[filterType]) {
      filterMap[filterType]();
    }
  }
  if (isProject) {
    const project = getProjectFromContainer(active);
    if (project) {
      renderProjectTasks(project);
    }
  }
}

// Prevent duplicate event listeners
let eventListenersInitialized = false;

function initializeEventListeners() {
  if (eventListenersInitialized) return;
  eventListenersInitialized = true;
  // Event delegation for dynamically created elements
  document.addEventListener("click", (event) => {
    // Handle add task button clicks
    if (event.target.closest(".add-task")) {
      addTaskDialog();
    }

    // Handle add project button clicks
    if (event.target.closest(".add-project")) {
      addProjectDialog();
    }

    // Handle close button clicks in dialogs
    if (event.target.matches(".close")) {
      const dialog = event.target.closest("dialog");
      if (dialog) closeDialog(dialog);
    }

    // Handle save task button clicks
    if (event.target.matches(".save-task")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        processForm(dialog, (formData) => {
          new Task(
            formData.get("task-name"),
            formData.get("task-description"),
            formData.get("task-due-date"),
            formData.get("task-priority"),
            formData.get("task-completed") === "on",
            formData.get("task-project")
          );

          // Remove the active class from any previously active button
          const activeButton = document.querySelector(".active");
          if (activeButton) {
            activeButton.classList.remove("active");
          }
          const all = document.querySelector("[data-filter='all']");
          if (all) {
            all.classList.add("active");
          }
          renderTasks();
        });
      }
    }

    // Handle save project button clicks
    if (event.target.matches(".save-project")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        processForm(dialog, (formData) => {
          new Project(
            formData.get("project-name"),
            formData.get("project-description")
          );
          renderProjects();
        });
      }
    }

    //handle delete task button clicks for tasks
    if (event.target.matches(".delete-btn")) {
      const taskCard = event.target.closest(".task-card");
      const taskId = taskCard.dataset.taskId;
      const task = findTaskById(taskId);
      if (
        task &&
        confirm(`Are you sure you want to delete the task ${task.taskName}?`)
      ) {
        deleteTask(task);
        Same();
      }
    }

    //handles the edit button clicks for tasks
    if (event.target.matches(".edit-btn")) {
      const taskCard = event.target.closest(".task-card");
      const taskId = taskCard.dataset.taskId;
      const task = findTaskById(taskId);
      if (task) {
        editTaskDialog(task);
      }
    }

    // handles save on edit task
    if (event.target.matches(".save-edit-task")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        processForm(dialog, (formData) => {
          const task = findTaskById(formData.get("task-id"));
          if (task) {
            editTask(
              task,
              formData.get("task-name"),
              formData.get("task-description"),
              formData.get("task-due-date"),
              formData.get("task-priority"),
              formData.get("task-completed") === "on",
              formData.get("task-project")
            );
          }
          Same();
        });
      }
    }

    //handling the filtering of task when the buttons are clicked
    if (event.target.matches(".task-filter button")) {
      const filterType = event.target.getAttribute("data-filter");

      if (filterMap[filterType]) {
        filterMap[filterType]();
      }
    }

    // handling the filtering of the project when the button is clicked
    if (event.target.matches(".project-btn")) {
      const project = getProjectFromContainer(event.target);
      if (project) {
        renderProjectTasks(project);
      }
    }

    //handling the setting of active for both projects and task filter
    if (event.target.matches(".project-btn, .task-filter button")) {
      const buttons = document.querySelectorAll(
        ".project-btn, .task-filter button"
      );
      buttons.forEach((btn) => btn.classList.remove("active"));
      event.target.classList.add("active");
    }

    // handles the add task to project button
    if (event.target.matches(".add-task-btn")) {
      const project = getProjectFromContainer(event.target);
      if (project) {
        addTaskDialog();
        setTimeout(() => {
          const projectSelect = document.querySelector(".task-project");
          if (projectSelect) {
            projectSelect.value = project.id;
          }
        }, 0);
      }
    }

    //handles the edit project button
    if (event.target.matches(".edit-project-btn")) {
      const project = getProjectFromContainer(event.target);
      if (project) {
        editProjectDialog(project);
      }
    }

    //handle save on the edit project
    if (event.target.matches(".save-edit-project")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        processForm(dialog, (formData) => {
          const project = findProjectById(formData.get("project-id"));
          if (project) {
            editProject(
              project,
              formData.get("project-name"),
              formData.get("project-description")
            );
            renderProjects();
          }
        });
      }
    }

    //handles the delete project button
    if (event.target.matches(".delete-project-btn")) {
      const project = getProjectFromContainer(event.target);
      if (
        project &&
        confirm(
          `Are you sure you want to delete the project ${project.projectName}?`
        )
      ) {
        deleteProject(project);
        renderProjects();
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

  //handles the search bar
  document.addEventListener("input", (event) => {
    if (event.target.matches(".search")) {
      const query = event.target.value.trim();

      if (query === "") {
        renderAll();
        return;
      }

      const searchResults = searchTasks(query);
      renderTasksByFilter(`Search: "${escapeHtml(query)}"`, searchResults);
    }
  });
}

export { initializeEventListeners };
