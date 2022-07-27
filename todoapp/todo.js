const addTask = document.querySelector("#sendToDo");
const todoAdd = document.querySelector("#todoAdd");
const list = document.querySelector("#list");
const select = document.querySelector("#selectHard");
const dateInput = document.querySelector("#dateInput");
const important = document.querySelector("#important");
const tomorrowTaskList = document.querySelector("#tomorrowTaskList");
const tooLate = document.querySelector("#tooLate");
const plohImg = document.querySelector("#ploh");
const plohText = document.querySelector("#ebattiplohText");
const plohModal = document.querySelector("#modalPloh");

let data;

addTask.addEventListener("click", () => {
  todoAdd.value ? addNewTask() : null;
  todoAdd.value = "";
});

todoAdd.addEventListener("keydown", (e) => {
  e.keyCode === 13 && todoAdd.value ? addNewTask() : null;
});

const dataVoidOrNot = () => {
  !localStorage.task
    ? (data = [])
    : (data = JSON.parse(localStorage.getItem("task")));
};

const checkNewDayUpdate = (date) => {
  let timer = setInterval(() => {
    let a = getDateNew(0);
    if (date == a) {
      dataVoidOrNot();
      clearInterval(timer);
    }
  }, 1000);
};

function Todo(props) {
  this.description = props;
  this.hard = select.value;
  dateInput.value.toLocaleString().slice(0, 10)
    ? (this.date = new Date(dateInput.value).toLocaleString().slice(0, 10))
    : (this.date = getDateNew(0));
}

const addNewTask = () => {
  data.push(new Todo(todoAdd.value));
  updateLocal("task");
  todoAdd.value = "";
};

const updateLocal = (props) => {
  localStorage.setItem(props, JSON.stringify(data));
  addList();
};

const addList = () => {
  console.log(data);
  todoAdd.focus();
  list.innerHTML = "";
  important.innerHTML = "";
  tomorrowTaskList.innerHTML = "";
  tooLate.innerHTML = "";
  let dataClone = data.slice();
  if (localStorage.task) {
    dataClone.reverse().forEach((element, index) => {
      element.date === getDateNew(0)
        ? (important.innerHTML += createItem(element, index))
        : element.date === getDateNew(1)
        ? (tomorrowTaskList.innerHTML += createItem(element, index))
        : compareDate(element.date)
        ? (tooLate.innerHTML += createItem(element, index))
        : (list.innerHTML += createItem(element, index));
    });
  }
  msgIfNoTask();
  checkNullImportant();
};

const compareDate = (dateElement) => {
  let arrDateElem = dateElement.split(".");
  let arrDateNow = getDateNew(0).split(".");
  if (
    arrDateElem[0] < arrDateNow[0] &&
    arrDateElem[1] <= arrDateNow[1] &&
    arrDateElem[2] <= arrDateNow[2]
  ) {
    return true;
  }
  if (
    arrDateElem[0] > arrDateNow[0] &&
    arrDateElem[1] < arrDateNow[1] &&
    arrDateElem[2] <= arrDateNow[2]
  ) {
    return true;
  }
  if (
    arrDateElem[0] > arrDateNow[0] &&
    arrDateElem[1] < arrDateNow[1] &&
    arrDateElem[2] <= arrDateNow[2]
  ) {
    return true;
  }
  if (arrDateElem[2] < arrDateNow[2]) {
    return true;
  }
  return false;
};

const deleteTask = (index) => {
  deleteTaskStyles(index);
  setTimeout(() => {
    data.splice(data.length - 1 - index, 1);
    updateLocal("task");
    addList();
  }, 500);
};
const deleteTaskStyles = (index) => {
  const delTask = document.querySelector("#task" + index);
  const delTaskText = document.querySelector("#task" + index + " .taskText p");
  const delTaskDate = document.querySelector("#task" + index + " .date");
  const delTaskInfo = document.querySelector("#task" + index + " .info");
  const deleteButton = document.querySelector("#task" + index + " .deleteTask");
  delTask.classList.add("deleteAnim");
  delTaskText.remove();
  delTaskDate.remove();
  delTaskInfo.remove();
  deleteButton.remove();
};
const createItem = (element, index) => {
  return `
  <div class='task ${
    element.hard == 1 ? "green" : element.hard == 2 ? "yellow" : "red"
  }' id='task${index}'>
    <div class='info'>
      <div class="date">${element.date}</div>
      <div class="taskText"><p>${element.description}</p></div>
    </div>
    <div class='deleteTask'>
    ${
      !compareDate(element.date)
        ? `<button onclick='confirmTask(${index})' class='deleteTaskButton'><img src="./imgAve/completeTask.png" alt="add"></button>`
        : ""
    }
      <button onclick='deleteTaskToArchive(${index});' class='deleteTaskButton'><img src="./imgAve/deleteTask.png" alt="delete"></button>
    </div>
    
  </div>
  `;
};
const checkNullImportant = () => {
  if (!important.innerHTML) {
  }
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

  updateImgPloh();
};

const updateImgPloh = () => {
  if (tooLate.innerHTML) {
    plohText.onmouseover = () => {
      plohImg.style.display = "block";
      plohModal.style.display = "block";
    };
    plohText.onmouseout = () => {
      plohImg.style.display = "none";
      plohModal.style.display = "none";
    };
  } else {
    plohText.onmouseover = () => {
      plohImg.style.display = "none";
      plohModal.style.display = "none";
    };
    !tooLate.innerHTML
      ? (tooLate.innerHTML += `<div class='chill'>Держи и дальше пустым</div>`)
      : null;
  }
};

const checkData = async () => {
  await dataVoidOrNot();
  await addList();
  await checkNewDayUpdate(getDateNew(1));
};
checkData();
