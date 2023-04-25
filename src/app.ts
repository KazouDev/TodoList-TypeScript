const list = document.querySelector<HTMLUListElement>('#list');
const addTaskForm = document.querySelector<HTMLFormElement>('#add-task-form');
const addTaskName = document.querySelector<HTMLInputElement>('#add-task-name');

var taskId: number = 0;

type Task = {
    id: number
    title: string
    completed: boolean
    createdAt: Date
}

const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

addTaskForm?.addEventListener('submit' , e => {
    e.preventDefault();

    if (addTaskName?.value == "" || addTaskName?.value == null) return;
    
    const task: Task = {
        id: taskId,
        title: addTaskName.value,
        completed: false,
        createdAt: new Date()
    }
    addTaskName.value = "";
    tasks.push(task);
    addListItem(task);
});

function addListItem(task: Task): void{
    const listItem: HTMLLIElement = document.createElement('li');
    const label: HTMLLabelElement = document.createElement('label');
    const checkbox: HTMLInputElement = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks()
    });

    label.append(checkbox, task.title);
    listItem.append(label);
    list?.append(listItem);
}

function saveTasks(): void {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem('Tasks');
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
}