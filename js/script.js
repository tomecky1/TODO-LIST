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
    
    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString = htmlString += `
            <li>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };
    
    
    
    
    
    const init = () => {
        render();

    };

    init();
}