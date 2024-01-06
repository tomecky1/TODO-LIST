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

  let hideDoneTasks = false;

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

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  }

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

  const renderTasks = () => {
    let tasksListHTMLContent = "";
    for (const task of tasks) {
      if (hideDoneTasks && task.done) {
        continue; // Skip rendering the task if it is done and hideDoneTasks is true
      }
      tasksListHTMLContent += `
        <li class="list__item">
          <button class="js-done buttonCheck">${task.done ? "✔️" : ""}</button>            
          <span class="list__item--span ${task.done ? "list__item--done" : ""}">${task.content}</span>
          <button class="js-remove buttonRemove">🗑️</button>  
        </li>
      `;
    }

    document.querySelector(".js-list").innerHTML = tasksListHTMLContent;
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");
    if (tasks.length > 0) {
      buttonsElement.innerHTML = `
        <button class="js-hideDoneTasks buttonHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="js-doneAllTasks buttonDoneAllTasks" ${tasks.every(({ done }) => done) ? "disabled" : ""
        }>
        Ukończ wszystkie
        </button>
        `;
    } else {
      buttonsElement.innerHTML = "";
    }
  };

  const bindButtonsEvents = () => {
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
    const doneAllTasksButton = document.querySelector(".js-doneAllTasks");
    hideDoneTasksButton.addEventListener("click", () => {
      toggleHideDoneTasks();
      render();
    });
    doneAllTasksButton.addEventListener("click", () => {
      markAllTasksDone();
      render();
    });
  };

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

  const render = () => {
    renderTasks();
    bindEvents();
    renderButtons();
    bindButtonsEvents();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
