const modalArchive = document.querySelector("#modalArchive");
const archiveOpenButton = document.querySelector("#archiveOpenButton");
const listArchiveTask = document.querySelector("#listArchiveTask");
const yepArchive = document.querySelector("#yepArchive");
const nopeArchive = document.querySelector("#nopeArchive");
let dataArchive;
let ArchivePageState = true;
function Archive(props, state) {
  this.description = props.description;
  this.hard = props.hard;
  this.date = props.date;
  this.stateConfirm = state;
}
const confirmTask = (index) => {
  let newDataArchive = data[data.length - 1 - index];
  dataArchive.push(new Archive(newDataArchive, true));
  afterSetNewArchive(index);
};
const deleteTaskToArchive = (index) => {
  let newDataArchive = data[data.length - 1 - index];
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
const fillDataArchive = (state) => {
  checkEmpty();
  changeStyleButtonsArchive();
  listArchiveTask.innerHTML = "";
  let dataCloneArchive = dataArchive.slice();
  if (localStorage.archive) {
    dataCloneArchive.reverse().forEach((element, index) => {
      element.stateConfirm == state
        ? (listArchiveTask.innerHTML += createItemArchiveTrue(element, index))
        : false;
    });
  }
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
checkEmpty();
