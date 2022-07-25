const addTask = document.querySelector("#sendToDo");
const todoAdd = document.querySelector("#todoAdd");
const list = document.querySelector("#list");
const select = document.querySelector("#selectHard");
const dateInput = document.querySelector("#dateInput");
const important = document.querySelector("#important");
let data;
let dateTime;
console.log([1, 0, 1, 1].map(parseInt));
const getDate = () => {
  dateTime = new Date().toLocaleString().slice(0, 10);
};

!localStorage.task
  ? (data = [])
  : (data = JSON.parse(localStorage.getItem("task")));

function Todo(props) {
  this.description = props;
  this.completed = select.value;
  dateInput.value.toLocaleString().slice(0, 10)
    ? (this.date = new Date(dateInput.value).toLocaleString().slice(0, 10))
    : (this.date = dateTime);
}
addTask.addEventListener("click", () => {
  todoAdd.value ? addNewTask() : null;
  todoAdd.value = "";
});
todoAdd.addEventListener("keydown", (e) => {
  e.keyCode === 13 && todoAdd.value ? addNewTask() : null;
});

const addNewTask = () => {
  data.push(new Todo(todoAdd.value));
  updateLocal();
  todoAdd.value = "";
};

const updateLocal = () => {
  localStorage.setItem("task", JSON.stringify(data));
  addList();
};

const addList = () => {
  getDate();
  console.log(data);
  todoAdd.focus();
  list.innerHTML = "";
  important.innerHTML = "";
  let dataClone = data.slice();
  if (localStorage != 0) {
    dataClone.reverse().forEach((element, index) => {
      element.date != dateTime
        ? (list.innerHTML += createItem(element, index))
        : (important.innerHTML += createItem(element, index));
    });
  }
  msgTaskNone();
};

const createItem = (element, index) => {
  return `
  <div class='task ${
    element.completed == 1 ? "green" : element.completed == 2 ? "yellow" : "red"
  }' id='task${index}'>
    <div class='info'>
      <div class="date">${element.date}</div>
      <div class="taskText"><b>${element.description}</b></div>
    </div>
    <div class='deleteTask'>
      <button onclick='deleteTask(${index})' class='deleteTaskButton'>Удалить</button>
    </div>
    
  </div>
  `;
};
const deleteTask = (index) => {
  const delTask = document.querySelector("#task" + index);
  delTask.classList.add("deleteAnim");
  setTimeout(() => {
    data.splice(data.length - 1 - index, 1);
    updateLocal();
    addList();
  }, 500);
};

const msgTaskNone = () => {
  !list.innerHTML && !important.innerHTML
    ? (list.innerHTML += `<div class='chill'>Ты вообще что-то делаешь?</div>`)
    : null;
  !important.innerHTML
    ? (important.innerHTML += `<div class='chill'>Сегодня задач нет, чилл</div>`)
    : null;
  !list.innerHTML
    ? (list.innerHTML += `<div class='chill'>Добавим новых задач?</div>`)
    : null;
};

addList();
