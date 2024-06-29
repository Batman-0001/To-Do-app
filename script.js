//adding the toggle feature in the website
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');


themeToggle.addEventListener('click', () => {
  //selecting the specific class by addition of which toggle will occur
  const isDark = document.body.classList.toggle('dark');
  
  //changing the background image dynamically by using toggle
  if (isDark) {
    themeIcon.src = './images/icon-sun.svg';
    themeIcon.alt = 'dark-mode';

  } else {
    themeIcon.src = './images/icon-moon.svg';
    themeIcon.alt = 'light-mode';
  }

});

//adding crud application feature in website
const input = document.querySelector(".inputbox input");
const tasks = document.querySelector(".tasks");

//adding event listener to the input box and add the functionality
input.addEventListener("keydown", (e) => {
  if (e.key === 'Enter' && input.value !== "") {

    const task = document.createElement("div");
    const checkbox = document.createElement("div");
    const para = document.createElement("p");
    const image = document.createElement("img");
    
    task.setAttribute("class", "task");
    checkbox.setAttribute("class", "check");
    image.setAttribute("src","./images/icon-cross.svg");
    image.setAttribute("alt", "delete the task");
    para.textContent = input.value;
    input.value = "";

    task.appendChild(checkbox);
    task.appendChild(para);
    task.appendChild(image);
    
    tasks.appendChild(task);

    addEventListeners(task);

    tasks.querySelectorAll(".task").forEach((item) => {
      item.setAttribute("draggable", "true");
      item.addEventListener("dragstart", dragStart);
      item.addEventListener("dragenter", dragEnter);
      item.addEventListener("dragover", dragOver);
      item.addEventListener("drop", drop);
      item.addEventListener("dragend", dragEnd);
    }); 

  }
  
});

//ading the drag and drop feature to the app
let draggable;

function dragStart(event) {
    event.dataTransfer.setData("text/html", event.currentTarget.innerHTML);
    event.dataTransfer.effectAllowed = "move";
    addEventListeners(event.currentTarget);  
}

function dragEnter(event){
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

function addEventListeners(task) {
  const checkbox = task.querySelector(".check");
  const para = task.querySelector("p");
  const image = task.querySelector("img");
  
  image.addEventListener("click", (e) => {
    e.currentTarget.parentNode.remove();
  });

  checkbox.addEventListener("click", () => {
    const checked = checkbox.classList.toggle("checked");

    if(checked) {
      checkbox.style.background = "url('./images/icon-check.svg') center no-repeat, linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))";
      para.style.color = "hsl(236, 9%, 61%)";
      para.style.textDecoration = "line-through";
    }

    else {
      checkbox.style.background = "hsl(0, 0%, 98%)";
      para.style.color = "hsl(235, 19%, 35%)";
      para.style.textDecoration = "none";
    }
    
  });
  
}
