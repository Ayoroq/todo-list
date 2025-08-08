import { taskList } from "./module.js";

let today = new Date();
today = today.toISOString().split("T")[0];

const main = document.querySelector(".main");
main.innerHTML = "";

function emptyData() {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    empty.innerHTML = `<p class="empty-text">Your task is empty</p>`
    main.appendChild(empty);
}

function defaultData() {
  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("task-container");
  taskList.forEach((element) => {
    const task = document.createElement("div");
    task.classList.add("task-card");
    task.dataset.taskId = element.id;
    task.innerHTML = `
        <div class="task-header">
          <input type="checkbox" class="task-checkbox">
          <h3 class="task-name">${element.taskName}</h3>
          <div class="task-actions">
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
          </div>
        </div>
        <div class="task-body">
          <p class="task-description hidden">${element.taskDescription}</p>
          <div class="task-meta">
            <span class="task-priority priority-${element.taskPriority.toLowerCase()}">${element.taskPriority}</span>
            <span class="task-due-date">${element.taskDueDate}</span>
          </div>
        </div>
    `;
    tasksContainer.appendChild(task);
  });
  main.appendChild(tasksContainer);
}

export { emptyData, defaultData}