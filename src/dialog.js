import { projectList, findProjectById } from "./module.js";
import { escapeHtml } from "./utils.js";

const body = document.querySelector("body");
function taskDialog(task = null) {
  const isEdit = task !== null;
  const dialog = document.createElement("dialog");
  dialog.classList.add(isEdit ? "edit-task-dialog" : "add-task-dialog");
  dialog.setAttribute("closedby", "closerequest");

  dialog.innerHTML = `
    <form action="" class="task-form" method="dialog">
    <h2>${isEdit ? "Edit Task" : "Add New Task"}</h2>
    <p>
        <label for="task-name" class="visually-hidden">Task Name</label>
        <input
        type="text"
        name="task-name"
        class="task-name"
        placeholder="Task Name"
        id="task-name"
        value="${isEdit ? escapeHtml(task.taskName) : ""}"
        required
        />
    </p>
    <p>
        <label for="task-description" class="visually-hidden">Task Description</label>
        <textarea
        name="task-description"
        class="task-description"
        placeholder="Task Description"
        id="task-description"
        >${isEdit ? escapeHtml(task.taskDescription) : ""}</textarea>
    </p>
    <p>
        <label for="task-priority">Choose a priority</label>
        <select
        name="task-priority"
        class="task-priority"
        id="task-priority"
        >
        <option value="high" ${
          isEdit && task.taskPriority === "high" ? "selected" : ""
        }>High</option>
        <option value="medium" ${
          isEdit && task.taskPriority === "medium" ? "selected" : ""
        }>Medium</option>
        <option value="low" ${
          isEdit && task.taskPriority === "low" ? "selected" : ""
        }>Low</option>
        </select>
    </p>
    <p>
        <label for="task-due-date">Task Due date</label>
        <input type="date" name="task-due-date" class="task-due-date" id="task-due-date" value="${
          isEdit ? escapeHtml(task.taskDueDate) : ""
        }">
    </p>
    <p>
        <label for="task-project">Add to Project</label>
        <select name="task-project" class="task-project" id="task-project">
        <option value="">No Project</option>
        </select>
    </p>
    ${isEdit ? `<input type="hidden" name="task-id" value="${escapeHtml(task.id)}">` : ""}
    <div class="dialog-buttons">
        <button type="button" class="close">Cancel</button>
        <button type="submit" class="${
          isEdit ? "save-edit-task" : "save-task"
        }">${isEdit ? "Update" : "Save"}</button>
    </div>
    </form>`;

  body.appendChild(dialog);
  dialog.showModal();

  // Populate projects dropdown
  const projectSelect = dialog.querySelector(".task-project");
  projectList.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = escapeHtml(project.projectName);
    option.selected = isEdit && task.taskProject === project.id;
    projectSelect.appendChild(option);
  });
}

// Convenience functions
function addTaskDialog() {
  taskDialog();
}

function editTaskDialog(task) {
  taskDialog(task);
}

function projectDialog(project = null) {
  const isEdit = project !== null;
  const dialog = document.createElement("dialog");
  dialog.classList.add(isEdit ? "edit-project-dialog" : "add-project-dialog");
  dialog.setAttribute("closedby", "closerequest");

  dialog.innerHTML = `
    <form action="" class="project-form" method="dialog">
    <h2>${isEdit ? "Edit Project" : "Add New Project"}</h2>
    <p>
        <label for="project-name" class="visually-hidden">Project Name</label>
        <input
        type="text"
        name="project-name"
        class="project-name"
        placeholder="Project Name"
        id="project-name"
        value="${isEdit ? escapeHtml(project.projectName) : ""}"
        required
        />
    </p>
    <p>
        <label for="project-description" class="visually-hidden">Project Description</label>
        <textarea
        name="project-description"
        class="project-description"
        placeholder="Project Description"
        id="project-description"
        >${isEdit ? escapeHtml(project.projectDescription) : ""}</textarea>
    </p>
    ${
      isEdit
        ? `<input type="hidden" name="project-id" value="${escapeHtml(project.id)}">`
        : ""
    }
    <div class="dialog-buttons">
        <button type="button" class="close">Cancel</button>
        <button type="submit" class="${
          isEdit ? "save-edit-project" : "save-project"
        }">${isEdit ? "Update" : "Save"}</button>
    </div>
    </form>`;

  body.appendChild(dialog);
  dialog.showModal();
}

// Convenience functions
function addProjectDialog() {
  projectDialog();
}

function editProjectDialog(project) {
  projectDialog(project);
}

export {
  addTaskDialog,
  addProjectDialog,
  editTaskDialog,
  editProjectDialog,
  taskDialog,
  projectDialog,
};
