# Front-end Style Guide

## Layout

The designs were created to the following widths:

- Mobile: 375px
- Desktop: 1440px

> 💡 These are just the design sizes. Ensure content is responsive and meets WCAG requirements by testing the full range of screen sizes from 320px to large screens.

## Colors

### Primary

- Bright Blue: hsl(220, 98%, 61%)
- Check Background: linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)

### Neutral

### Light Theme

- Very Light Gray: hsl(0, 0%, 98%)
- Very Light Grayish Blue: hsl(236, 33%, 92%)
- Light Grayish Blue: hsl(233, 11%, 84%)
- Dark Grayish Blue: hsl(236, 9%, 61%)
- Very Dark Grayish Blue: hsl(235, 19%, 35%)

### Dark Theme

- Very Dark Blue: hsl(235, 21%, 11%)
- Very Dark Desaturated Blue: hsl(235, 24%, 19%)
- Light Grayish Blue: hsl(234, 39%, 85%)
- Light Grayish Blue (hover): hsl(236, 33%, 92%)
- Dark Grayish Blue: hsl(234, 11%, 52%)
- Very Dark Grayish Blue: hsl(233, 14%, 35%)
- Very Dark Grayish Blue: hsl(237, 14%, 26%)

## Typography

### Body Copy

- Font size: 18px

### Font

- Family: [Josefin Sans](https://fonts.google.com/specimen/Josefin+Sans)
- Weights: 400, 700

> 💎 [Upgrade to Pro](https://www.frontendmentor.io/pro?ref=style-guide) for design file access to see all design details and get hands-on experience using a professional workflow with tools like Figma.


const bgImage = document.querySelector('.bg-image');

bgImage.style.backgroundImage = 'url("./images/bg-desktop-dark.jpg")';

  task.querySelectorAll(".check").forEach((item) => {
     
    });
    task.querySelectorAll("p").forEach((item) => {
      item.setAttribute("draggable", "true");
      item.addEventListener("dragstart", dragStart);
      item.addEventListener("dragenter", dragEnter);
      item.addEventListener("dragover", dragOver);
      item.addEventListener("drop", drop);
      item.addEventListener("dragend", dragEnd);
    });
    task.querySelectorAll("img").forEach((item) => {
      item.setAttribute("draggable", "true");
      item.addEventListener("dragstart", dragStart);
      item.addEventListener("dragenter", dragEnter);
      item.addEventListener("dragover", dragOver);
      item.addEventListener("drop", drop);
      item.addEventListener("dragend", dragEnd);
    });