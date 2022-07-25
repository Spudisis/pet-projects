const addTask = document.querySelector("#sendToDo");
const todoAdd = document.querySelector("#todoAdd");
const list = document.querySelector("#list");
const select = document.querySelector("#selectHard");
const trash = document.querySelector("#trash");
let data;

!localStorage.task
  ? (data = [])
  : (data = JSON.parse(localStorage.getItem("task")));

function Todo(props) {
  this.description = props;
  this.completed = select.value;
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
  list.innerHTML = "";
  let dataClone = data.slice();
  if (localStorage != 0) {
    dataClone.reverse().forEach((element, index) => {
      list.innerHTML += createItem(element, index);
    });
  }
};

const createItem = (element, index) => {
  return `
  <div class='task ${
    element.completed == 1 ? "green" : element.completed == 2 ? "yellow" : "red"
  }' id='task${index}'>
    <div class="taskText">${element.description}</div>
    <div class='deleteTask'>
      <button onclick='deleteTask(${index})' class='deleteTaskButton'>Удалить</button>
    </div>
    
  </div>
  `;
};
const deleteTask = (index) => {
  const delTask = document.querySelector("#task" + index);
  delTask.classList.add("deleteAnim");
  console.log(delTask.offsetTop);
  trash.className = "trashAnim";
  // trash.style.bottom = delTask.offsetTop;
  setTimeout(() => {
    trash.className = "trash";
  }, 2000);
  setTimeout(() => {
    data.splice(data.length - 1 - index, 1);
    updateLocal();
    addList();
  }, 1000);
};

addList();
