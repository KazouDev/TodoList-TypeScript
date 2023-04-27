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

var tasks: Task[] = loadTasks();

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
    taskId++;
    addTaskName.value = "";
    tasks.push(task);
    addListItem(task);
});

function addListItem(task: Task): void{
    const listItem: HTMLLIElement = document.createElement('li');
    const label: HTMLLabelElement = document.createElement('label');
    const checkbox: HTMLInputElement = document.createElement('input');
    const trashIcon: HTMLImageElement = document.createElement('img');
    const taskTitle: HTMLSpanElement = document.createElement('span');

    taskTitle.innerText = task.title;
    trashIcon.setAttribute('src', 'public/trash.svg');
    label.setAttribute('for', '"');

    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
    });

    trashIcon.addEventListener('click', () => {
        deleteTask(task);
    });

    label.append(checkbox, taskTitle, trashIcon);
    listItem.append(label);
    listItem.setAttribute('id', task.id.toString());
    list?.append(listItem);
    saveTasks();
}

function saveTasks(): void {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem('Tasks');
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
}

function deleteTask(task: Task): void {
    removeListItem(task);
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
}

function removeListItem(task: Task): void {
    var liList = list?.querySelectorAll('li');
    if (liList){
        liList.forEach(li => {
            if (li.getAttribute('id') != null && li.getAttribute('id') === task.id.toString()){
                li.remove();
            }
        })
    }
}