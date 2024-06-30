// Theme toggle feature
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const input = document.querySelector(".inputbox input");
const tasks = document.querySelector(".tasks");

// Adding references for footer feautures
const itemsLeft = document.querySelector(".one p");
const filterAll = document.querySelector(".two p:nth-child(1)");
const filterActive = document.querySelector(".two p:nth-child(2)");
const filterCompleted = document.querySelector(".two p:nth-child(3)");
const clearCompleted = document.querySelector(".three p");

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeIcon.src = isDark ? './images/icon-sun.svg' : './images/icon-moon.svg';
  themeIcon.alt = isDark ? 'dark-mode' : 'light-mode';
});

// Adding CRUD application feature in the website
input.addEventListener("keydown", (e) => {
  if (e.key === 'Enter' && input.value !== "") {
    createTask(tasks);
    input.value = "";
    updateItemsLeft(); // Update item count
    addDragAndDrop(tasks);
  }
});

// Creating a task
function createTask(tasks) {
  const task = document.createElement("div");
  const checkbox = document.createElement("div");
  const para = document.createElement("p");
  const image = document.createElement("img");
  
  task.setAttribute("class", "task");
  checkbox.setAttribute("class", "check");
  image.setAttribute("src", "./images/icon-cross.svg");
  image.setAttribute("alt", "delete the task");

  para.textContent = input.value;

  task.appendChild(checkbox);
  task.appendChild(para);
  task.appendChild(image);
  
  tasks.appendChild(task);
  addEventListeners(task);
}

// Adding event listeners to the elements
function addEventListeners(task) {
  const checkbox = task.querySelector(".check");
  const para = task.querySelector("p");
  const image = task.querySelector("img");
  
  image.addEventListener("click", (e) => {
    e.currentTarget.parentNode.remove();
    updateItemsLeft(); // Update item count
  });

  checkbox.addEventListener("click", () => {
    const checked = checkbox.classList.toggle("checked");
    if (checked) {
      checkbox.style.background = "url('./images/icon-check.svg') center no-repeat, linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
      para.style.color = "hsl(236, 9%, 61%)";
      para.style.textDecoration = "line-through";
    } else {
      checkbox.style.background = "";
      para.style.color = "";
      para.style.textDecoration = "none";
    }
    updateItemsLeft(); // Update item count
  });
}

// New function to update the items left count
function updateItemsLeft() {
  const totalTasks = tasks.querySelectorAll(".task").length;
  const completedTasks = tasks.querySelectorAll(".task .checked").length;
  itemsLeft.textContent = `${totalTasks - completedTasks} items left`;
}

// Added event listeners for filters
filterAll.addEventListener("click", () => {
  tasks.querySelectorAll(".task").forEach(task => {
    task.style.display = "flex";
  });
});

filterActive.addEventListener("click", () => {
  tasks.querySelectorAll(".task").forEach(task => {
    task.style.display = task.querySelector(".check").classList.contains("checked") ? "none" : "flex";
  });
});

filterCompleted.addEventListener("click", () => {
  tasks.querySelectorAll(".task").forEach(task => {
    task.style.display = task.querySelector(".check").classList.contains("checked") ? "flex" : "none";
  });
});

// Added clear completed functionality
clearCompleted.addEventListener("click", () => {
  tasks.querySelectorAll(".task .checked").forEach(task => {
    task.parentNode.remove();
  });
  updateItemsLeft(); // Update item count
});

// Adding the drag and drop feature to the app
let draggable;

function addDragAndDrop(tasks) {
  tasks.querySelectorAll(".task").forEach((item) => {
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", drop);
    item.addEventListener("dragend", dragEnd);
  }); 
}

function dragStart(event) {
  event.dataTransfer.setData("text/html", event.currentTarget.innerHTML);
  event.dataTransfer.effectAllowed = "move";
}

function dragEnter(event) {
  event.preventDefault();
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  draggable = event.currentTarget.innerHTML;
  const data = event.dataTransfer.getData("text/html");
  event.dataTransfer.dropEffect = "move";
  event.currentTarget.innerHTML = data;
  addEventListeners(event.currentTarget);
  event.preventDefault();
}

function dragEnd(event) {
  event.currentTarget.innerHTML = draggable;
  addEventListeners(event.currentTarget);
  event.preventDefault();
}
