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
    addTaskName.value = "";
    tasks.push(task);
    addListItem(task);
});
function addListItem(task) {
    var listItem = document.createElement('li');
    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function () {
        task.completed = checkbox.checked;
        saveTasks();
    });
    label.append(checkbox, task.title);
    listItem.append(label);
    list === null || list === void 0 ? void 0 : list.append(listItem);
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
