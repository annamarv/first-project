function getTask() {
  const inputs = document.querySelectorAll("input");
  const task = {
    data: inputs[0].value,
    date: inputs[1].value,
    time: inputs[2].value,
  };
  return task;
}

function save() {
  const task = getTask();
  const currentTasks = localStorage.getItem("allTasks");
  let arr = [];

  if (currentTasks) {
    arr = JSON.parse(currentTasks);
  }

  arr.push(task);

  localStorage.setItem("allTasks", JSON.stringify(arr));

  loadTasks();

  reset();
}

function loadTasks() {
  const containerDiv = document.querySelector("#containerDiv");
  containerDiv.innerHTML = "";
  const currentTasks = localStorage.getItem("allTasks");
  if (currentTasks) {
    const arr = JSON.parse(currentTasks);

    for (let i = 0; i < arr.length; i++) {
      const task = arr[i];
      addTaskToHTML(i, task);
    }
  }
}

function addTaskToHTML(i, task) {
  const containerDiv = document.querySelector("#containerDiv");
  let message = `<div id="task_${i}" class = "task"> 
        <i class="bi bi-x-circle-fill" onclick="deleteTask(${i})" ></i>
        <div class="taskData">${task.data}</div>
        <div>${task.date}</div>
        <div>${task.time}</div>
        </div>`;

  containerDiv.innerHTML += message;
}

function onFormSubmit(event) {
  event.preventDefault();
  save();
}

function reset() {
  const inputs = document.querySelectorAll("input");
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
}

function deleteTask(i) {
  const currentTasks = localStorage.getItem("allTasks");
  if (currentTasks) {
    const arr = JSON.parse(currentTasks);

    arr.splice(i, 1);

    localStorage.setItem("allTasks", JSON.stringify(arr));

    loadTasks();
  }
}

function onWindowLoad() {
  loadTasks();

  const form = document.querySelector("form");
  form.onsubmit = onFormSubmit;

  const resetBtn = document.querySelector("#resetBtn");
  resetBtn.onclick = reset;
}

window.onload = onWindowLoad;
