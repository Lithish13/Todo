//selectors
const todoInput = document.querySelector(".input");
const todoAdd = document.querySelector(".add");
const todoFormInput = document.querySelector(".inputClass");
const todoList = document.querySelector(".todo-list");
const todoDropDown = document.querySelector(".task");
//event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoAdd.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoDropDown.addEventListener("click", opitionFilter);
//functions
function addTodo(e) {
  e.preventDefault();
  //div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //li
  const newtodo = document.createElement("li");
  newtodo.classList.add("todoListItem");
  newtodo.innerText = todoFormInput.value;
  todoDiv.append(newtodo);
  //saving to loocalstorage
  saveLocalTodos(todoFormInput.value);
  //creating btn
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = "<i class='fas fa-check'></i>";
  todoDiv.append(completeBtn);

  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash");
  trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
  todoDiv.append(trashBtn);
  //append to list
  todoList.append(todoDiv);
  //clearing input
  todoFormInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function opitionFilter(e) {
  const todos = todoList.childNodes;
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
        }
        break;
      case "pending":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //li
    const newtodo = document.createElement("li");
    newtodo.classList.add("todoListItem");
    newtodo.innerText = todo;
    todoDiv.append(newtodo);
    //saving to loocalstorage
    saveLocalTodos(todoFormInput.value);
    //creating btn
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.append(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.append(trashBtn);
    //append to list
    todoList.append(todoDiv);
  });
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
