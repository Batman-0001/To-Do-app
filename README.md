
## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)



## Overview

A simple and intuitive to-do application with data-saving, drag-and-drop, and theme switching features. This app helps you manage your tasks efficiently with a clean and user-friendly interface.

### Screenshot

![](./images/Screenshot%202024-07-07%20222155.png);
![](./images/Screenshot%202024-07-07%20222229.png);


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

I began with the basic design of the website, focusing on its fundamental layout and structure. Next, I styled the website using CSS to enhance its visual appeal. Following this, I utilized JavaScript to implement the theme toggling option, drag-and-drop functionality, and task creation features. Finally, I integrated IndexedDB to ensure that tasks and related data are saved in the client's local storage, providing a seamless and persistent user experience.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Javascript
- HTML Drag and Drop API
- IndexedDB database

### What I learned

I have learned about IndexedDB and the HTML Drag and Drop API. By implementing these technologies in my project, I enabled dynamic task management and ensured data persistence. This allows users to make changes to their tasks and save them, ensuring that their data is retained and available the next time they open the app.


```js
const openRequest = window.indexedDB.open("ex_db", 3);

openRequest.addEventListener("success", (event) => {
    db = event.target.result;

    console.log("database opened succesfully.");

    displayData();
});

openRequest.addEventListener("error", (event) => {
    console.log(`error occured: ${event.target.errorCode}`);
});

```

## Author

- Website - [Suraj Kumar Santra](https://github.com/Batman-0001)
- Frontend Mentor - [@Batman-0001](https://www.frontendmentor.io/profile/Batman-0001)
- Twitter - [@SurajKSantra001](https://www.twitter.com/SurajKSantra001)


