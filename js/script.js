{
  let tasks = [
    {
      content: "Zrobić zakupy",
      done: false,
    },
    {
      content: "Zrobić pranie",
      done: true,
    },
  ];

  const toggleTaskDone = (index) => {
    tasks = tasks.map((task, taskIndex) => {
      if (taskIndex === index) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    render();
    
  };
  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
        render();
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButtons, index) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(index);
        render();
      });
    });
  };

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString = htmlString += `
            <li class="list__li">
            <button class="js-done buttonCheck">${task.done ? "✔️" : ""
        }</button>            
            <span class="list__item ${task.done ? "list__item--done" : ""}">${task.content
        }</span>
            <button class="js-remove buttonRemove">🗑️</button>  
            </li>
            `;
    }

    document.querySelector(".js-list").innerHTML = htmlString;

    bindEvents();
  };

  const renderButtons = () => {    
      document.querySelector(".js-buttons").innerHTML = `
      <button class="todoList__button--flexItem2 js-hideDoneTasks">Ukryj ukończone</button>
      <button class="todoList__button--flexItem3 js-doneAllTasks">Ukończ wszystkie</button>
      `;
      
      bindButtonsEvents();
   };

  const bindButtonsEvents = () => { };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".js-input").value.trim();
    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
  };
  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
      },
    ];
    render();
  };
  const init = () => {
    render();
    renderButtons();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
