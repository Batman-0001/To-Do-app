const input = document.querySelector(".inputbox input");
const tasks = document.querySelector(".tasks");
const tNSw = document.querySelector(".task-n-switches");
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const itemsLeft = document.querySelector('.one p');
const body = document.body;
let count;

const osName = "we_os1";
const osName2 = "we_os2";
let db;

const openRequest = window.indexedDB.open("ex_db", 3);

openRequest.addEventListener("success", (event) => {
    db = event.target.result;

    console.log("database opened succesfully.");

    displayData();
});

openRequest.addEventListener("error", (event) => {
    console.log(`error occured: ${event.target.errorCode}`);
});

openRequest.addEventListener("upgradeneeded", (event) => {
    db = event.target.result;
    
    const objectStore = db.createObjectStore(osName, {
        keyPath: "id",
        autoIncrement: true
    });

    objectStore.createIndex("bodyClass", "bodyClass", {unique: false});
    objectStore.createIndex("task", "task", {unique: false});
    objectStore.createIndex("bgColor", "bgColor", {unique: false});
    objectStore.createIndex("txColor", "txColor", {unique: false});
    objectStore.createIndex("txDec", "txDec", {unique: false});

    const objectStore2 = db.createObjectStore(osName2, {
        keyPath: "id",
        autoIncrement: true
    });

    objectStore2.createIndex("toggleImg", "toggleImg", {unique: false});
    objectStore2.createIndex("toggleAlt", "toggleAlt", {unique: false});

    console.log("datastore creation successful.");

    addData2();
});


function addData2() {
  //adding the toggle data
    const newItem2 = {bodyClass: body.getAttribute("class"),
      toggleImg: themeIcon.getAttribute("src"),
      toggleAlt: themeIcon.getAttribute("alt")
     };
    const transaction = db.transaction([osName2], "readwrite");
    const objectStore2 = transaction.objectStore(osName2);
    const addRequest2 = objectStore2.add(newItem2);
    
    addRequest2.addEventListener("success", () => {
    console.log("data added successfully.");
    
    });
    
    addRequest2.addEventListener("error", () => {
    console.log("data can't be added.");
    });
}


input.addEventListener("keydown", addData);

function addData(event) {
    if (event.key === "Enter" && input.value !== "") {
        const newItem = {bodyClass: body.getAttribute("class"),
                         cbClass: "unchecked",
                         task: input.value,
                         bgColor: tNSw.style.backgroundColor,
                         txColor: tasks.style.color,
                         txDec: "none",
                        };

        const transaction = db.transaction([osName], "readwrite");

        const objectStore = transaction.objectStore(osName);
        const addRequest = objectStore.add(newItem);

        addRequest.addEventListener("success", () => {
            console.log("data added succesfully.");

            input.value = "";
        });

        transaction.addEventListener("complete", () => {
            console.log("transaction completed.");

            displayData();
        });

        transaction.addEventListener("error", () => {
            console.log("transaction can't be completed.");
        });
    }
}


function displayData() {
    count = 0;
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    }
    const transaction = db.transaction([osName,osName2], "readwrite");

    const objectStore2 = transaction.objectStore(osName2);
    objectStore2.openCursor().addEventListener("success", (event) => {
      let cursor = event.target.result;
      if(cursor) {
        body.setAttribute("class", cursor.value.bodyClass);
        themeIcon.setAttribute("src", cursor.value.toggleImg);
        themeIcon.setAttribute("alt", cursor.value.toggleAlt);
        cursor.continue();
      }
    });

    let objectStore = transaction.objectStore(osName);
    objectStore.openCursor().addEventListener("success", (event) => {
        let cursor = event.target.result;
        if(cursor) {
            createTask(cursor);
            cursor.continue();
        }
        itemsLeft.textContent = `${count} items left`;
    });

}

function addEventListeners(task) {

    const checkbox = task.querySelector(".check");
    const para = task.querySelector("p");
    const image = task.querySelector("img");
    
    image.addEventListener("click", deleteItem);
    
    const paraColor = input.style.color;
    const paraBgColor = para.style.background;
  
    checkbox.addEventListener("click", (event) => {
      const checked = checkbox.classList.toggle("checked");
      
      if(checked) {
        checkbox.style.background = "url('./images/icon-check.svg') center no-repeat, linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))";
        para.style.color = "hsl(236, 9%, 61%)";
        para.style.textDecoration = "line-through";
        saveData(event.currentTarget);
      }
  
      else {
        checkbox.style.background = paraBgColor;
        para.style.color = paraColor;
        para.style.textDecoration = "none";
        saveData(event.currentTarget);
      }
      
    });
    
  }


themeToggle.addEventListener('click', (event) => {
  
  //selecting the specific class by addition of which toggle will occur
  const isDark = document.body.classList.toggle('dark');
  
  //changing the background image dynamically by using toggle
  if (isDark) {
    themeIcon.src = './images/icon-sun.svg';
    themeIcon.alt = 'dark-mode';
    saveBg(event.currentTarget.querySelector(".theme-icon"));

  } else {
    themeIcon.src = './images/icon-moon.svg';
    themeIcon.alt = 'light-mode';
    saveBg(event.currentTarget.querySelector(".theme-icon"));
  }

});

function saveData(checkbox) {
   const objectStore = db.transaction([osName], "readwrite").objectStore(osName);
   
   const request = objectStore.get(Number(checkbox.parentNode.getAttribute("data-note-id")));

   request.addEventListener("success", (event) => {
    const data = event.target.result;

    data.cbClass = checkbox.classList.contains("checked") ? "checked" : "unchecked";
    data.bgColor = checkbox.style.background;
    data.txColor = checkbox.parentNode.querySelector("p").style.color;
    data.txDec = checkbox.parentNode.querySelector("p").style.textDecoration;

    const requestUpdate = objectStore.put(data);

    requestUpdate.addEventListener("success", () => {
      console.log("data updated successfully.");
    });

    requestUpdate.addEventListener("error", () => {
      console.log("updation failed.");
    });
   });

   request.addEventListener("error", () => {
    console.error("access denied.");
   });
}

function saveBg(icon) {
   const transaction = db.transaction(osName2, "readwrite");
   const objectStore = transaction.objectStore(osName2);
  
   const data = {bodyClass: body.classList.contains("dark") ? "dark" : "",
                 toggleImg: icon.getAttribute("src"),
                 toggleAlt: icon.getAttribute("alt")
                };

    const requestUpdate = objectStore.put(data);
    
    requestUpdate.addEventListener("success", () => {
      console.log("data updated successfully");
    });

    requestUpdate.addEventListener("error", () => {
      console.log("data updation failed");
    });
  }

function deleteItem(event) {
  const noteId = Number(event.target.parentNode.getAttribute("data-note-id"));

  const transaction = db.transaction(osName, "readwrite");
  const objectStore = transaction.objectStore(osName);
  const deleteRequest = objectStore.delete(noteId);

  transaction.addEventListener("complete", () => {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  });

  transaction.addEventListener("error", () => {
    console.log("deletion failed.");
  });
}



//adding drag and drop
//adding the drag and drop feature to the app
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
  updateData(event.currentTarget);
  saveData(event.currentTarget.querySelector(".check"));
}

function dragEnd(event) {
  event.currentTarget.innerHTML = draggable;
  addEventListeners(event.currentTarget);
  event.preventDefault();
  updateData(event.currentTarget);
  saveData(event.currentTarget.querySelector(".check"));
}

function updateData(task) {
  const transaction = db.transaction(osName, "readwrite");
  const objectStore = transaction.objectStore(osName);

  const request = objectStore.get(Number(task.getAttribute("data-note-id")));

  request.addEventListener("success", (event) => {
    const data = event.target.result;

    data.task = task.querySelector("p").textContent;

    const requestUpdate = objectStore.put(data);

    requestUpdate.addEventListener("success", () => {
      console.log("data updated successfully.");
    });

  });

  request.addEventListener("error", () => {
    console.log("data updation failed.");
  });

}

//filteration system
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");


all.addEventListener("click", displayAll);
active.addEventListener("click", displayActive);
completed.addEventListener("click", displayCompleted);


const color = all.style.color;

function displayAll(event) {
  const button = event.currentTarget;
  const allClicked = button.classList.toggle("clicked");
  active.classList.remove("clicked");
  completed.classList.remove("clicked");

  if (allClicked) {
    displayData();
  } else {
    displayData();
  }

}

function displayActive(event) {
  const button = event.currentTarget;
  const activeClicked = button.classList.toggle("clicked");
  all.classList.remove("clicked");
  completed.classList.remove("clicked");

  if (activeClicked) {
    count = 0;
    while (tasks.firstChild) {
      tasks.removeChild(tasks.firstChild);
    }
    const transaction = db.transaction(osName, "readwrite");
    const objectStore = transaction.objectStore(osName);

    objectStore.openCursor().addEventListener("success", (event) => {
      let cursor = event.target.result;
      
      if(cursor) {
        if (cursor.value.txDec !== "line-through") {
          createTask(cursor);
        }
        cursor.continue();
      }
      itemsLeft.textContent = `${count} items left`;
    });
  } else {
    displayData();
  } 
}

function displayCompleted(event) {
  const button = event.currentTarget;
  const completedClicked = button.classList.toggle("clicked");
  all.classList.remove("clicked");
  active.classList.remove("clicked");

  if (completedClicked) {
    count = 0;
    while (tasks.firstChild) {
      tasks.removeChild(tasks.firstChild);
    }
    const transaction = db.transaction(osName, "readwrite");
    const objectStore = transaction.objectStore(osName);

    objectStore.openCursor().addEventListener("success", (event) => {
      let cursor = event.target.result;
      
      if(cursor) {
        if (cursor.value.txDec === "line-through") {  
            createTask(cursor);
        }
        cursor.continue();
      }
      itemsLeft.textContent = `${count} items left`;
    });

  } else {
    displayData();
  }
}

//create tasks to add to database
function createTask(cursor) {
  const task = document.createElement("div");
  const checkbox = document.createElement("div");
  const para = document.createElement("p");
  const image = document.createElement("img");
  
  task.setAttribute("class", "task");
  checkbox.setAttribute("class", "check");
  image.setAttribute("src","./images/icon-cross.svg");
  image.setAttribute("alt", "delete the task");
  task.setAttribute("data-note-id", cursor.value.id);

  para.textContent = cursor.value.task;
  para.style.color = cursor.value.txColor;
  para.style.textDecoration = cursor.value.txDec;
  checkbox.style.background = cursor.value.bgColor;
  checkbox.classList.add(cursor.value.cbClass);
  
  task.appendChild(checkbox);
  task.appendChild(para);
  task.appendChild(image);
  
  tasks.appendChild(task);
        
  addEventListeners(task);

  addDragAndDrop(tasks);
  count++;
}

