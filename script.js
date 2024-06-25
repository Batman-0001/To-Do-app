document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
  
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark');
      body.classList.toggle('light', !isDark);
      if (isDark) {
        themeIcon.src = './images/icon-sun.svg';
        themeToggle.setAttribute('data-theme', 'dark');
      } else {
        themeIcon.src = './images/icon-moon.svg';
        themeToggle.setAttribute('data-theme', 'light');
      }
    });
  });