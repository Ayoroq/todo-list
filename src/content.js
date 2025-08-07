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
  const tasks = document.createElement("div");
  tasks.classList.add("tasks");
  taskList.forEach((element) => {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
    <div class="task-name">${element.taskName}</div>
    <div class="task-description">${element.taskDescription}</div>
    <div class="task-due-date">${element.taskDueDate}</div>
    <div class="task-priority">${element.taskPriority}</div>
    <div class="task-status">${element.taskStatus}</div>
    `;
    tasks.appendChild(task);
  });
  main.appendChild(tasks);
}

export { emptyData, defaultData}