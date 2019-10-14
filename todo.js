const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
const DEL_BTN = 'btn-del';
const TODO_SPAN = 'span-todo';
const TODO_LI = 'li-todo';

let toDos = [];

function deleteToDo(event) {
  // console.log(event);
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  console.log(text);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  delBtn.classList.add(DEL_BTN);
  span.innerText = text;
  span.classList.add(TODO_SPAN);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  li.classList.add(TODO_LI);
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);

  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if( loadedToDos !== null ) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(toDo => {
      paintToDo(toDo.text);
    });
  }
}


function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();