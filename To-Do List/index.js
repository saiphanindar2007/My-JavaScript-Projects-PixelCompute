let tasks = [];
if (localStorage.getItem("tasks") !== null) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const search = document.getElementById("search");
const repeatTask = document.getElementById("repeatTask");

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const showTasks = () => {
  let dueHTML = "";
  let upcomingHTML = "";
  let now = new Date();

  tasks.forEach((task, index) => {
    if (task.task && task.task.toLowerCase().includes(search.value.toLowerCase())) {
      let line = task.done ? "line-through" : "none";
      let checked = task.done ? "checked" : "";
      let daily = task.repeat ? " [Daily]" : "";

      let html = `<p><input type="checkbox" ${checked} onchange="toggleTask(${index})">
      <span style="text-decoration:${line}">${task.task} [${task.date}] ${task.time}${daily}</span>
      <button onclick="deleteTask(${index})">Delete</button></p>`;

      if (new Date(task.date + "T" + (task.time || "00:00")) <= now) {
        dueHTML += html;
      } else {
        upcomingHTML += html;
      }
    }
  });
  document.getElementById("dueTasks").innerHTML = dueHTML;
  document.getElementById("upcomingTasks").innerHTML = upcomingHTML;
};

const addTask = () => {
  if (taskInput.value === "" || taskDate.value === "") {
    alert("Please fill all fields");
    return;
  }

  let task = {
    task: taskInput.value,
    date: taskDate.value,
    time: taskTime.value,
    done: false,
    doneDate: "",
    repeat: repeatTask.checked
  };

  tasks.push(task);
  saveTasks();

  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
  repeatTask.checked = false;

  showTasks();
};

const toggleTask = (index) => {
  tasks[index].done = !tasks[index].done;
  tasks[index].doneDate = new Date().toLocaleDateString();
  saveTasks();
  showTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
};

const resetDailyTasks = () => {
  let today = new Date().toLocaleDateString();

  tasks.forEach((task) => {
    if (task.repeat && task.doneDate !== today) {
      task.done = false;
    }
  });

  saveTasks();
};

document.getElementById("addButton").addEventListener("click", addTask);
search.addEventListener("input", showTasks);

resetDailyTasks();
showTasks();
