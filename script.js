const btn = document.getElementById("btn");
const input = document.getElementById("taskInput");
const cardsWrapper = document.getElementById("cards-wrapper");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const buildCards = () => {
    cardsWrapper.innerHTML = "";

    [...tasks].reverse().forEach((task) => {
        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.title;
        taskTitle.setAttribute("class", "card-title");
    
        const taskCard = document.createElement("div");
        taskCard.setAttribute("class", "card");
    
        taskCard.addEventListener("click", () => {
            const index = tasks.findIndex(item => {
                return item.title === task.title;
            })

            console.log(task.title);
            console.log(tasks.findIndex(t => {
                return t.title === task.title} ));

            
        tasks[index].isDone = !tasks[index].isDone;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        buildCards();

        })
    
        taskCard.append(taskTitle);
    
        const circle = document.createElement("div");
        const circleStyle = task.isDone ? "completed" : "not-completed";
    
        circle.setAttribute("class", circleStyle);
    
        taskCard.append(circle);
    
        cardsWrapper.append(taskCard);
    });
};

btn.addEventListener("click", ()=> {

    const trimmedValue = input.value.trim();

    if(trimmedValue.length < 3)
    {
        console.log("Input too short");
        return;
    }

    const task = {title: trimmedValue, isDone: false, creationDate: new Date()};
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    buildCards();
});


buildCards();


