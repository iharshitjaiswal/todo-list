
const todoinput = document.querySelector('.input');
const todobutton = document.querySelector('.todo_button');
const todolist = document.querySelector('.todo_list');
const filteroption = document.querySelector(".filter-todo");

document.addEventListener('DOMContentLoaded',getTodos);
todobutton.addEventListener("click", addTodo);
todolist.addEventListener('click', deleteCheck);
filteroption.addEventListener('change', filterTodo)

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li")
    newTodo.innerText = todoinput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    savelocalTodos(todoinput.value);

    todoinput.value = "";

    const completeButton = document.createElement('button')
    completeButton.innerHTML = `<i class ="fas fa-check"></i>`;
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class ="fa fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todolist.appendChild(todoDiv);
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");

        removeLocalTodos(todo);

        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todolist.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                } break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                } break;
        }
    });
}

// local storage function

function savelocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li")
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoinput.value = "";

        const completeButton = document.createElement('button')
        completeButton.innerHTML = `<i class ="fas fa-check"></i>`;
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class ="fa fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todolist.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}