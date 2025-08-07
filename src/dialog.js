function addTaskDialog() {
    const body = document.querySelector('body');
    const dialog = document.createElement('dialog');
    dialog.classList.add('add-task-dialog');
    dialog.innerHTML = `
    <form action="" class="task-form" method="dialog">
    <h2>Add New Task</h2>
    <p>
        <label for="task-name" class="visually-hidden">Task Name</label>
        <input
        type="text"
        name="task-name"
        class="task-name"
        placeholder="Task Name"
        id="task-name"
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
        ></textarea>
    </p>
    <p>
        <label for="task-priority">Choose a priority</label>
        <select
        name="task-priority"
        class="task-priority"
        id="task-priority"
        >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
        </select>
    </p>
    <p>
        <label for="task-due-date">Task Due date</label>
        <input type="datetime-local" name="task-due-date" class="task-due-date" id="task-due-date">
    </p>
    <p>
        <label for="task-project">Add to Project</label>
        <select name="task-project" class="task-project" id="task-project">
        <option value="">No Project</option>
        </select>
    </p>
    <div class="dialog-buttons">
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
    </div>
    </form>`;

    body.appendChild(dialog);
    dialog.showModal();
}

export { addTaskDialog };