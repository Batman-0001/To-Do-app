//adding the toggle feature in the website
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const bgImage = document.querySelector('.bg-image');

themeToggle.addEventListener('click', () => {
  //selecting the specific class by addition of which toggle will occur
  const isDark = document.body.classList.toggle('dark');
  
  //changing the background image dynamically by using toggle
  if (isDark) {
    themeIcon.src = './images/icon-sun.svg';
    themeIcon.alt = 'dark-mode';
    bgImage.style.backgroundImage = 'url("./images/bg-desktop-dark.jpg")';

  } else {
    themeIcon.src = './images/icon-moon.svg';
    themeIcon.alt = 'light-mode';
    bgImage.style.backgroundImage = 'url("./images/bg-desktop-light.jpg")';
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

    image.addEventListener("click", (e) => {
      e.target.parentNode.remove();
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
  
});