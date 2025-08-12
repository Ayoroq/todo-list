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
import { addTaskDialog, addProjectDialog, editTaskDialog,editProjectDialog } from "./dialog.js";
import { renderTasks, renderProjects, renderAll, renderProjectTasks, renderTasksByFilter } from "./render.js";

// Helper functions for repeated code
function closeDialog(dialog) {
  dialog.close();
  dialog.remove();
}

function processForm(dialog, callback) {
  const form = dialog.querySelector("form");
  if (form.checkValidity()) {
    const formData = new FormData(form);
    callback(formData);
    closeDialog(dialog);
  }
}

function getProjectFromContainer(element) {
  const projectId = element.closest(".project-container").dataset.projectId;
  return projectList.find((p) => p.id === projectId);
}

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

    //handle delete task button clicks
    if (event.target.matches(".delete-btn")) {
      const taskCard = event.target.closest(".task-card");
      const taskId = taskCard.dataset.taskId;
      const task = findTaskById(taskId);
      if (task && confirm(`Are you sure you want to delete the task ${task.taskName}?`)) {
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
            renderTasks();
          }
        });
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

  //handling the filtering of task when the buttons are clicked
  document.addEventListener("click", (event) => {
    if (event.target.matches(".task-filter button")) {
      const filterType = event.target.getAttribute("data-filter");
      
      const filterMap = {
        'all': () => renderAll(),
        'today': () => renderTasksByFilter("Today's", getTodayTasks()),
        'completed': () => renderTasksByFilter("Completed", getCompletedTasks()),
        'overdue': () => renderTasksByFilter("Overdue", getOverdueTasks()),
        'this-week': () => renderTasksByFilter("This Week's", getThisWeeksTasks()),
        'high-priority': () => renderTasksByFilter("High Priority", getHighPriorityTasks())
      };
      
      if (filterMap[filterType]) {
        filterMap[filterType]();
      }
    }
  })
  // handling the filtering of the project when the button is clicked
  document.addEventListener("click", (event) => {
    if (event.target.matches(".project-btn")) {
      const project = getProjectFromContainer(event.target);
      if (project) {
        renderProjectTasks(project);
      }
    }
  })

  // handles the add task to project button
  document.addEventListener("click", (event) => {
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
  })

  //handles the edit project button
  document.addEventListener("click", (event) => {
    if (event.target.matches(".edit-project-btn")) {
      const project = getProjectFromContainer(event.target);
      if (project) {
        editProjectDialog(project);
      }
    }
  })

  //handle save on the edit project
  document.addEventListener("click", (event) => {
    if (event.target.matches(".save-edit-project")) {
      const dialog = event.target.closest("dialog");
      if (dialog) {
        processForm(dialog, (formData) => {
          const project = findProjectById(formData.get("project-id"));
          if (project) {
            editProject(project, formData.get("project-name"), formData.get("project-description"));
            renderProjects();
          }
        });
      }
    }
  })

  //handles the delete project button
  document.addEventListener("click", (event) => {
    if (event.target.matches(".delete-project-btn")) {
      const project = getProjectFromContainer(event.target);
      if (project && confirm(`Are you sure you want to delete the project ${project.projectName}?`)) {
        deleteProject(project);
        renderProjects();
      }
    }
  })

  //handles the search bar
  document.addEventListener("input", (event) => {
    if (event.target.matches(".search")) {
      const query = event.target.value.trim();
      
      if (query === "") {
        renderAll();
        return;
      }
      
      const searchResults = searchTasks(query);
      renderTasksByFilter(`Search: "${query}"`, searchResults);
    }
  });
}

export { initializeEventListeners };
