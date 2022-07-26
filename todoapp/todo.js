const addTask = document.querySelector("#sendToDo");
const todoAdd = document.querySelector("#todoAdd");
const list = document.querySelector("#list");
const select = document.querySelector("#selectHard");
const dateInput = document.querySelector("#dateInput");
const important = document.querySelector("#important");
const tomorrowTaskList = document.querySelector("#tomorrowTaskList");

let data;

function isPrime(num) {
  if (num >= 2) {
    let summ = 0;
    for (let i = 1; i <= num; i++) {
      if (num / i == Math.round(num / i)) {
        summ++;
        console.log(i, "yes");
      }
    }
    console.log(summ);
    if (summ > 2) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

console.log(isPrime(4));
const getDateNew = (day) => {
  let dateTime = new Date().toLocaleString().slice(0, 10);
  if (day !== 0) {
    let dat = new Date();
    let mm = dat.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;
    dateTime = +(dat.getDate() + 1) + "." + mm + "." + dat.getFullYear();
  }
  return dateTime;
};

const dataVoidOrNot = () => {
  !localStorage.task
    ? (data = [])
    : (data = JSON.parse(localStorage.getItem("task")));
  addList();
};

function Todo(props) {
  this.description = props;
  this.completed = select.value;
  dateInput.value.toLocaleString().slice(0, 10)
    ? (this.date = new Date(dateInput.value).toLocaleString().slice(0, 10))
    : (this.date = getDateNew(0));
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
  console.log(data);
  todoAdd.focus();
  list.innerHTML = "";
  important.innerHTML = "";
  tomorrowTaskList.innerHTML = "";
  let dataClone = data.slice();
  if (localStorage != 0) {
    dataClone.reverse().forEach((element, index) => {
      element.date === getDateNew(0)
        ? (important.innerHTML += createItem(element, index))
        : element.date === getDateNew(1)
        ? (tomorrowTaskList.innerHTML += createItem(element, index))
        : (list.innerHTML += createItem(element, index));
    });
  }
  msgIfNoTask();
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

const msgIfNoTask = () => {
  !list.innerHTML && !important.innerHTML && !tomorrowTaskList.innerHTML
    ? (list.innerHTML += `<div class='chill'>Ты вообще что-то делаешь?</div>`)
    : null;
  !important.innerHTML
    ? (important.innerHTML += `<div class='chill'>Сегодня задач нет, чилл</div>`)
    : null;
  !list.innerHTML
    ? (list.innerHTML += `<div class='chill'>Добавим новых задач?</div>`)
    : null;
  !tomorrowTaskList.innerHTML
    ? (tomorrowTaskList.innerHTML += `<div class='chill'>Завтра отдыхаем</div>`)
    : null;
};

dataVoidOrNot();
