"use strict";
var list = document.querySelector('#list');
var addTaskForm = document.querySelector('#add-task-form');
var addTaskName = document.querySelector('#add-task-name');
var taskId = 0;
var tasks = loadTasks();
tasks.forEach(addListItem);
addTaskForm === null || addTaskForm === void 0 ? void 0 : addTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if ((addTaskName === null || addTaskName === void 0 ? void 0 : addTaskName.value) == "" || (addTaskName === null || addTaskName === void 0 ? void 0 : addTaskName.value) == null)
        return;
    var task = {
        id: taskId,
        title: addTaskName.value,
        completed: false,
        createdAt: new Date()
    };
    taskId++;
    addTaskName.value = "";
    tasks.push(task);
    addListItem(task);
});
function addListItem(task) {
    var listItem = document.createElement('li');
    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    var trashIcon = document.createElement('img');
    var taskTitle = document.createElement('span');
    taskTitle.innerText = task.title;
    trashIcon.setAttribute('src', 'public/trash.svg');
    label.setAttribute('for', '"');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function () {
        task.completed = checkbox.checked;
        saveTasks();
    });
    trashIcon.addEventListener('click', function () {
        deleteTask(task);
    });
    label.append(checkbox, taskTitle, trashIcon);
    listItem.append(label);
    listItem.setAttribute('id', task.id.toString());
    list === null || list === void 0 ? void 0 : list.append(listItem);
    saveTasks();
}
function saveTasks() {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}
function loadTasks() {
    var taskJSON = localStorage.getItem('Tasks');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
function deleteTask(task) {
    removeListItem(task);
    tasks = tasks.filter(function (t) { return t.id !== task.id; });
    saveTasks();
}
function removeListItem(task) {
    var liList = list === null || list === void 0 ? void 0 : list.querySelectorAll('li');
    if (liList) {
        liList.forEach(function (li) {
            if (li.getAttribute('id') != null && li.getAttribute('id') === task.id.toString()) {
                li.remove();
            }
        });
    }
}
