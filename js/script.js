{
  const tasks = [
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
    tasks[index].done = !tasks[index].done;
    render();
  };
  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        tasks.splice(index, 1);
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
            <li ${task.done ? 'style="text-decoration: line-through"' : ""}>
            <button class="js-done">zrobione?</button> 
            <button class="js-remove">Usuń zadanie</button>    
            ${task.content}
            </li>
            `;
    }

    document.querySelector(".js-list").innerHTML = htmlString;

    bindEvents();
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
    tasks.push({
      content: newTaskContent,
    });
    render();
  };
  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
