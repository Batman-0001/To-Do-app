//adding the toggle feature in the website
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const bgImage = document.querySelector('.bg-image');

themeToggle.addEventListener('click', () => {
  //selecting the specific class by addition of which toggle will occur
  const isDark = themeToggle.classList.toggle('dark');
  
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

const input = document.querySelector(".inputbox input");
input.addEventListener("click", (e) => {
  input.style.border = "2px solid orange";
});
