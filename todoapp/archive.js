const modalArchive = document.querySelector("#modalArchive");
const archiveOpenButton = document.querySelector("#archiveOpenButton");
const listArchiveTask = document.querySelector("#listArchiveTask");
const yepArchive = document.querySelector("#yepArchive");
const nopeArchive = document.querySelector("#nopeArchive");
const clearArchiveYep = document.querySelector("#clearArchiveYep");
const clearArchiveNope = document.querySelector("#clearArchiveNope");

let dataArchive;
let ArchivePageState = true;
let newDataArchive;
let checkArchivePageState;

function Archive(props, state) {
  this.description = props.description;
  this.hard = props.hard;
  this.date = props.date;
  this.stateConfirm = state;
}
const confirmTask = (index) => {
  index === data.length
    ? (newDataArchive = data[data.length - index])
    : (newDataArchive = data[data.length - 1 - index]);
  dataArchive.push(new Archive(newDataArchive, true));
  afterSetNewArchive(index);
};
const deleteTaskToArchive = (index) => {
  index === data.length
    ? (newDataArchive = data[data.length - index])
    : (newDataArchive = data[data.length - 1 - index]);
  dataArchive.push(new Archive(newDataArchive, false));
  afterSetNewArchive(index);
};

const afterSetNewArchive = (index) => {
  localStorage.setItem("archive", JSON.stringify(dataArchive));
  deleteTask(index);
};

const checkEmpty = () => {
  !localStorage.archive
    ? (dataArchive = [])
    : (dataArchive = JSON.parse(localStorage.getItem("archive")));
};
const changeStyleButtonsArchive = () => {
  ArchivePageState
    ? (yepArchive.className = "yepArchiveActive")
    : (nopeArchive.className = "nopeArchiveActive");
  ArchivePageState
    ? (nopeArchive.className = "nopeArchive")
    : (yepArchive.className = "yepArchive");
};

const changeStyleButtonsArchiveClear = () => {
  ArchivePageState
    ? (clearArchiveYep.className = "clearArchive")
    : (clearArchiveNope.className = "clearArchive");
  ArchivePageState
    ? (clearArchiveNope.className = "clearArchiveNone")
    : (clearArchiveYep.className = "clearArchiveNone");
};
const fillDataArchive = (state) => {
  checkEmpty();
  changeStyleButtonsArchive();
  changeStyleButtonsArchiveClear();
  let dataCloneArchive = dataArchive.slice();
  if (localStorage.archive && checkArchivePageState != state) {
    listArchiveTask.innerHTML = "";
    dataCloneArchive.reverse().forEach((element, index) => {
      element.stateConfirm == state
        ? (listArchiveTask.innerHTML += createItemArchiveTrue(element, index))
        : false;
    });
  }
  checkArchivePageState = state;
  checkEmptyArchive();
};

const clearArchive = (state) => {
  if (localStorage.archive) {
    listArchiveTask.innerHTML = "";
    let pageTodo = [];
    let dataCloneArchive = dataArchive.slice();
    dataCloneArchive.forEach((element, index) => {
      element.stateConfirm == state ? pageTodo.push(index) : false;
    });
    pageTodo.reverse().forEach((element, index) => {
      dataCloneArchive.splice(element, 1);
    });
    localStorage.setItem("archive", JSON.stringify(dataCloneArchive));
    checkEmptyArchive();
  }
};
const checkEmptyArchive = () => {
  !listArchiveTask.innerHTML
    ? (listArchiveTask.innerHTML +=
        "<img src='./imgAve/hereTooVoid.jpg' alt='hereTooVoid' class='listArchiveTaskImg'/>")
    : false;
};
const createItemArchiveTrue = (element, index) => {
  return `
  <div class='task ${
    element.hard == 1 ? "green" : element.hard == 2 ? "yellow" : "red"
  }' id='task${index}'>
    <div class='info'>
      <div class="date">${element.date}</div>
      <div class="taskText"><p>${element.description}</p></div>
    </div>
  </div>
  `;
};

const openModalWindow = () => {
  fillDataArchive(true);
  modalArchive.style.display = "block";
  plohText.style.zIndex = "0";
};
const closeModalWindow = (e) => {
  let target = e.target;
  if (target == modalArchive) {
    modalArchive.style.display = "none";
    plohText.style.zIndex = "1";
    ArchivePageState = true;
    changeStyleButtonsArchive();
    changeStyleButtonsArchiveClear();
  }
};
archiveOpenButton.addEventListener("click", openModalWindow);
modalArchive.addEventListener("click", closeModalWindow);
yepArchive.addEventListener("click", () => {
  ArchivePageState = true;
  fillDataArchive(true);
});
nopeArchive.addEventListener("click", () => {
  ArchivePageState = false;
  fillDataArchive(false);
});
clearArchiveYep.addEventListener("click", () => {
  clearArchive(ArchivePageState);
});
clearArchiveNope.addEventListener("click", () => {
  clearArchive(ArchivePageState);
});
checkEmpty();
