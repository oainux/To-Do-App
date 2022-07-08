const form = document.querySelector("form");
const task = document.querySelector("form input:first-child");
const description = document.querySelector(".description");
const createTaskBtn = document.querySelector(".create-task");
const section = document.querySelector(".tasks-sec");
const clearAllBtn = document.querySelector(".clear-all-btn");
const select = document.querySelector("select");

let tasks = localStorage.getItem("tasks");
if (localStorage.getItem("tasks") == null) localStorage.setItem("tasks","[]");
tasks = localStorage.getItem("tasks");
const newarray = JSON.parse(tasks);
let i = 0;

/* clear all btn functionality */
clearAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".tasks-sec__tasks-card").forEach(card => card.remove());
    localStorage.setItem("tasks","[]")
})

/* select btn functionality */
select.addEventListener("change", test)
function test() {
    const value = select.options[select.selectedIndex].value;
    if (value == "completed") {
        document.querySelectorAll(".completed-task").forEach(tsk => tsk.classList.remove("hidden"));
        document.querySelectorAll(".uncompleted-task").forEach(tsk => tsk.classList.add("hidden"));
    }
    else if (value == "active") {
        document.querySelectorAll(".uncompleted-task").forEach(tsk => tsk.classList.remove("hidden"));
        document.querySelectorAll(".completed-task").forEach(tsk => tsk.classList.add("hidden"));
    }
    else document.querySelectorAll(".tasks-sec__tasks-card").forEach(tsk => tsk.classList.remove("hidden"));
}

/* get tasks from local host and create task cards */
if (localStorage.getItem("tasks") != null) {
    	const tasksArray = JSON.parse(tasks)
        tasksArray.forEach(task => {
        /* creating elements */
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const taskCard = document.createElement("div");
    	const taskContent = document.createElement("div");
    	const line = document.createElement("div");
    	const btnsContainer = document.createElement("div");
    	const deleteBtn = document.createElement("button");
    	const editBtn = document.createElement("button");
    	const completeBtn = document.createElement("button");
        const editTaskContainer = document.createElement("div");
    	const editTaskContent = document.createElement("div");
    	const closeBtn = document.createElement("button");
    	const closeBtnOutterDiv = document.createElement("div");
    	const closeBtnInnerDiv1 = document.createElement("div");
    	const closeBtnInnerDiv2 = document.createElement("div");
    	const h3 = document.createElement("h3");
    	const editForm = document.createElement("form");
    	const editTaskInput = document.createElement("input");
    	const editDesInput = document.createElement("input");
    	const editConformBtn = document.createElement("button");
        /* creating text for elements */
        h2.textContent = task.h2;
        p.textContent = task.p;
        h3.textContent = "Edit Task";
    	editConformBtn.textContent = "Confirm";
        /* adding classes and attributes to elements */
    	h2.classList.add("tasks-sec__tasks-card__tasks-content__headings");
    	p.classList.add("tasks-sec__tasks-card__tasks-content__descriptions");
    	line.classList.add("tasks-sec__tasks-card__tasks-content__line");
    	taskCard.classList.add("tasks-sec__tasks-card");
    	taskCard.setAttribute("id",`${i}`);
    	taskContent.classList.add("tasks-sec__tasks-card__tasks-content");
    	btnsContainer.classList.add("tasks-sec__tasks-card__btns-container");
		deleteBtn.classList.add("tasks-sec__tasks-card__btns-container__delete-btn");
    	editBtn.classList.add("tasks-sec__tasks-card__btns-container__edit-btn");
        editTaskContainer.classList.add("tasks-sec__tasks-card__btns-container__edit-task-msg");
    	editTaskContent.classList.add("tasks-sec__tasks-card__btns-container__edit-task-msg__edit-task-content");
    	closeBtn.classList.add("tasks-sec__tasks-card__btns-container__edit-task-msg__close-edit");
    	editTaskInput.setAttribute("type","text");
    	editDesInput.setAttribute("type","text");
    	editTaskInput.required = true;
    	editTaskInput.setAttribute("placeholder","Task Name");
    	editDesInput.setAttribute("placeholder","Description");
    	completeBtn.classList.add("tasks-sec__tasks-card__btns-container__completed-btn");
        taskCard.setAttribute("id",`${i}`);
        /* appending elements in each other and to main eventually */
        taskContent.appendChild(h2);
    	taskContent.appendChild(p);
    	taskContent.appendChild(line);
        btnsContainer.appendChild(deleteBtn);
    	btnsContainer.appendChild(editBtn);
    	btnsContainer.appendChild(completeBtn);
    	taskCard.appendChild(taskContent);
    	taskCard.appendChild(btnsContainer);
    	section.appendChild(taskCard);
        editForm.appendChild(editTaskInput);
    	editForm.appendChild(editDesInput);
    	editForm.appendChild(editConformBtn);
    	closeBtnOutterDiv.appendChild(closeBtnInnerDiv1);
    	closeBtnOutterDiv.appendChild(closeBtnInnerDiv2);
    	closeBtn.appendChild(closeBtnOutterDiv);
    	editTaskContent.appendChild(closeBtn);
    	editTaskContent.appendChild(h3);
    	editTaskContent.appendChild(editForm);
    	editTaskContainer.appendChild(editTaskContent);
        btnsContainer.appendChild(editTaskContainer);
    	i++; /* increase i for new task cards id (to help navigate cards and delete them from website and localhost) */

        /* delete task btn functionality */
        deleteBtn.addEventListener("click", (e) => {
        	const card = e.currentTarget.closest(".tasks-sec__tasks-card");
            const id = parseInt(card.getAttribute("id"));
            const tasksClone = JSON.parse(localStorage.getItem("tasks"));
            tasksClone.splice(id,1);
            card.remove();
            localStorage.setItem("tasks",JSON.stringify(tasksClone))
    	})

        /* edit task btn functionality */
        editBtn.addEventListener("click",(e) => {
        	e.currentTarget.closest(".tasks-sec__tasks-card").querySelector(".tasks-sec__tasks-card__btns-container__edit-task-msg").classList.add("tasks-sec__tasks-card__btns-container__edit-task-msg-visible");  
        	document.querySelector("body").classList.add("filtered");
    	})

        /* complete task btn functionality */
        completeBtn.addEventListener("click",(e) => {
        	e.currentTarget.closest(".tasks-sec__tasks-card").querySelector("h2").classList.toggle("tasks-sec__tasks-card__tasks-content__completed-text");
        	e.currentTarget.closest(".tasks-sec__tasks-card").querySelector("p").classList.toggle("tasks-sec__tasks-card__tasks-content__completed-text");
        	e.currentTarget.closest(".tasks-sec__tasks-card").querySelector(".tasks-sec__tasks-card__tasks-content__line").classList.toggle("tasks-sec__tasks-card__tasks-content__line-completed");
            e.currentTarget.closest(".tasks-sec__tasks-card").classList.toggle("uncompleted-task");
            e.currentTarget.closest(".tasks-sec__tasks-card").classList.toggle("completed-task");
            const card = e.currentTarget.closest(".tasks-sec__tasks-card");
            const id = parseInt(card.getAttribute("id"));
            const cloneTask = JSON.parse(localStorage.getItem("tasks"));
            if (cloneTask[id].completed == false) cloneTask[id].completed = true;
            else cloneTask[id].completed = false;
            localStorage.setItem("tasks",JSON.stringify(cloneTask))
   		})

        /* edit task form functionality */
		editForm.addEventListener("submit", (e) => {
			e.preventDefault();
    		e.stopPropagation();
            const card = e.currentTarget.closest(".tasks-sec__tasks-card");
        	const h2 = card.querySelector("h2");
        	const p = card.querySelector("p");
            h2.textContent = card.querySelector("input:first-child").value;
        	p.textContent = card.querySelector("input:last-of-type").value;
        	const id = parseInt(card.getAttribute("id"));
        	const tasksClone = JSON.parse(localStorage.getItem("tasks"));
        	tasksClone[id].h2 = card.querySelector("input:first-child").value;
        	tasksClone[id].p = card.querySelector("input:last-of-type").value;
        	localStorage.setItem("tasks",JSON.stringify(tasksClone));
        	document.body.classList.remove("filtered")
    	    e.currentTarget.querySelectorAll("input").forEach(put => put.value = "")
            e.currentTarget.closest(".tasks-sec__tasks-card").querySelector(".tasks-sec__tasks-card__btns-container__edit-task-msg").classList.remove("tasks-sec__tasks-card__btns-container__edit-task-msg-visible");
        })

        /* edit task close btn functionality */
		closeBtn.addEventListener("click",(e) => {
        	e.currentTarget.closest(".tasks-sec__tasks-card").querySelector(".tasks-sec__tasks-card__btns-container__edit-task-msg").classList.remove("tasks-sec__tasks-card__btns-container__edit-task-msg-visible");  
            document.querySelector("body").classList.remove("filtered");
    	})

        /* add class completed to tasks card is task was completed, if not add class uncompleted task (to help in select btn valus) */
        if (task.completed == true) {
            taskCard.classList.add("completed-task");
            line.classList.add("tasks-sec__tasks-card__tasks-content__line-completed");
            h2.classList.add("tasks-sec__tasks-card__tasks-content__completed-text");
            p.classList.add("tasks-sec__tasks-card__tasks-content__completed-text");
        } else {
            taskCard.classList.add("uncompleted-task");
        }
    })
}

/* task create form event listener */
form.addEventListener("submit", content)

/* create task form functionality */
function content(e) {
    e.preventDefault();
    e.stopPropagation();
    /* creating elements */
    const taskCard = document.createElement("div");
    const taskContent = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const line = document.createElement("div");
    const btnsContainer = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const completeBtn = document.createElement("button");
    const editTaskContainer = document.createElement("div");
    const editTaskContent = document.createElement("div");
    const closeBtn = document.createElement("button");
    const closeBtnOutterDiv = document.createElement("div");
    const closeBtnInnerDiv1 = document.createElement("div");
    const closeBtnInnerDiv2 = document.createElement("div");
    const h3 = document.createElement("h3");
    const editForm = document.createElement("form");
    const editTaskInput = document.createElement("input");
    const editDesInput = document.createElement("input");
    const editConformBtn = document.createElement("button");
    /* creating text for elements */
    h2.textContent = task.value;
    p.textContent = description.value;
    h3.textContent = "Edit Task";
    editConformBtn.textContent = "Confirm";
    /* adding classes and attributes to elements */
    h2.classList.add("tasks-sec__tasks-card__tasks-content__headings");
    p.classList.add("tasks-sec__tasks-card__tasks-content__descriptions");
    line.classList.add("tasks-sec__tasks-card__tasks-content__line");
    taskCard.classList.add("tasks-sec__tasks-card","uncompleted-task");
    taskCard.setAttribute("id",`${i}`);
    taskContent.classList.add("tasks-sec__tasks-card__tasks-content");
    btnsContainer.classList.add("tasks-sec__tasks-card__btns-container");
	deleteBtn.classList.add("tasks-sec__tasks-card__btns-container__delete-btn");
    editBtn.classList.add("tasks-sec__tasks-card__btns-container__edit-btn");
    completeBtn.classList.add("tasks-sec__tasks-card__btns-container__completed-btn");
    editTaskContainer.classList.add("tasks-sec__tasks-card__btns-container__edit-task-msg");
    editTaskContent.classList.add("tasks-sec__tasks-card__btns-container__edit-task-msg__edit-task-content");
    closeBtn.classList.add("tasks-sec__tasks-card__btns-container__edit-task-msg__close-edit");
    editTaskInput.setAttribute("type","text");
    editDesInput.setAttribute("type","text");
    editTaskInput.required = true;
    editTaskInput.setAttribute("placeholder","Task Name");
    editDesInput.setAttribute("placeholder","Description");
    /* appending elements in each other and to main eventually */
    taskContent.appendChild(h2);
    taskContent.appendChild(p);
    taskContent.appendChild(line);
    editForm.appendChild(editTaskInput);
    editForm.appendChild(editDesInput);
    editForm.appendChild(editConformBtn);
    closeBtnOutterDiv.appendChild(closeBtnInnerDiv1);
    closeBtnOutterDiv.appendChild(closeBtnInnerDiv2);
    closeBtn.appendChild(closeBtnOutterDiv);
    editTaskContent.appendChild(closeBtn);
    editTaskContent.appendChild(h3);
    editTaskContent.appendChild(editForm);
    editTaskContainer.appendChild(editTaskContent)
	btnsContainer.appendChild(deleteBtn);
    btnsContainer.appendChild(editBtn);
    btnsContainer.appendChild(completeBtn);
    btnsContainer.appendChild(editTaskContainer);
    taskCard.appendChild(taskContent);
    taskCard.appendChild(btnsContainer);
    section.appendChild(taskCard);
	
    /* edit task form functionality */ 
    editForm.addEventListener("submit", (e) => {
		e.preventDefault();
    	e.stopPropagation();
        h2.textContent = editTaskInput.value;
        p.textContent = editDesInput.value;
        const card = editForm.closest(".tasks-sec__tasks-card");
        const id = parseInt(card.getAttribute("id"));
        const tasksClone = JSON.parse(localStorage.getItem("tasks"));
        tasksClone[id].h2 = editTaskInput.value;
        tasksClone[id].p = editDesInput.value;
        localStorage.setItem("tasks",JSON.stringify(tasksClone));
        document.body.classList.remove("filtered");
    	editForm.querySelectorAll("input").forEach(put => put.value = "");
        editForm.closest(".tasks-sec__tasks-card").querySelector(".tasks-sec__tasks-card__btns-container__edit-task-msg").classList.remove("tasks-sec__tasks-card__btns-container__edit-task-msg-visible");
	})

    /* edit task close btn functionality */
    closeBtn.addEventListener("click",() => {
        closeBtn.closest(".tasks-sec__tasks-card").querySelector(".tasks-sec__tasks-card__btns-container__edit-task-msg").classList.remove("tasks-sec__tasks-card__btns-container__edit-task-msg-visible");  
        document.querySelector("body").classList.remove("filtered");
    })

    /* delete task btn functionality */
    deleteBtn.addEventListener("click", () => {
		const card = deleteBtn.closest(".tasks-sec__tasks-card");
        const id = parseInt(card.getAttribute("id"));
        const tasksClone = JSON.parse(localStorage.getItem("tasks"));
        tasksClone.splice(id,1);
        card.remove();
        localStorage.setItem("tasks",JSON.stringify(tasksClone));
    })

    /* edit task btn functionality */
    editBtn.addEventListener("click",()=> {
        editBtn.closest(".tasks-sec__tasks-card").querySelector(".tasks-sec__tasks-card__btns-container__edit-task-msg").classList.add("tasks-sec__tasks-card__btns-container__edit-task-msg-visible");  
        document.querySelector("body").classList.add("filtered");
    })

    /* complete task btn functionality */
    completeBtn.addEventListener("click",(e) => {
        e.currentTarget.closest(".tasks-sec__tasks-card").classList.toggle("completed-task");
        e.currentTarget.closest(".tasks-sec__tasks-card").classList.toggle("uncompleted-task");
        e.currentTarget.closest(".tasks-sec__tasks-card").querySelector("h2").classList.toggle("tasks-sec__tasks-card__tasks-content__completed-text");
        e.currentTarget.closest(".tasks-sec__tasks-card").querySelector("p").classList.toggle("tasks-sec__tasks-card__tasks-content__completed-text");
        e.currentTarget.closest(".tasks-sec__tasks-card").querySelector(".tasks-sec__tasks-card__tasks-content__line").classList.toggle("tasks-sec__tasks-card__tasks-content__line-completed");
    	const card = e.currentTarget.closest(".tasks-sec__tasks-card");
        const id = parseInt(card.getAttribute("id"));
        const cloneTask = JSON.parse(localStorage.getItem("tasks"));
        if (cloneTask[id].completed == false) cloneTask[id].completed = true;
        else cloneTask[id].completed = false;
        localStorage.setItem("tasks",JSON.stringify(cloneTask));
    })

    test();
    i++; /* increase i for new task cards id (to help navigate cards and delete them from website and localhost) */
    newarray.push({h2:task.value,p:description.value,completed:false});
    localStorage.setItem("tasks",JSON.stringify(newarray));
    form.querySelectorAll("input").forEach(put => put.value = "");
}

