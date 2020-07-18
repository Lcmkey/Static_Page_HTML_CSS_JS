// CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

// Variable
let LIST, id;

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Get item from localStorage
let data = localStorage.getItem("TODO") || "[]";
data = JSON.parse(data);

if (data.length) {
  LIST = data;
  id = LIST[LIST.length - 1].id + 1;
} else {
  LIST = [];
  id = 0;
}

// Load items to the user's interface
const loadList = (arr) => {
  arr.map((item) => {
    const { name, id, done } = item;

    addTodo(name, id, done);
  });
};

// Add to do function
const addTodo = (todo, id, done) => {
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
    <li class="item">
      <i class="fa ${DONE} co" job="complete" id=${id}></i>
      <p class="text ${LINE}">${todo}</p>
      <i class="fa fa-trash-o de" job="delete" id=${id}></i>
    </li>
  `;

  const position = "beforeEnd";

  list.insertAdjacentHTML(position, item);
};

// Add an item to the list user the enter key
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    const todo = input.value;

    if (todo) {
      addTodo(todo, id, false, false);

      LIST.push({
        name: todo,
        id,
        done: false,
      });

      // Add item to localStorage (this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }

    input.value = "";
  }
});

// Complete to do
const completeTodo = (ele) => {
  ele.classList.toggle(CHECK);
  ele.classList.toggle(UNCHECK);
  ele.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[ele.id].done = LIST[ele.id].done ? false : true;
};

// Remove to do
const removeTodo = (ele) => {
  ele.parentNode.parentNode.removeChild(ele.parentNode);

  // Update localStorage Data
  LIST = LIST.filter((item) => ele.id != item.id);
  localStorage.setItem("TODO", JSON.stringify(LIST));
};

// Target the items created dynamically
list.addEventListener("click", (event) => {
  const ele = event.target;
  const eleJob = ele.attributes.job ? ele.attributes.job.value : undefined;

  if (eleJob == "complete") {
    completeTodo(ele);
  } else if (eleJob == "delete") {
    removeTodo(ele);
  }

  // Add item to localStorage (this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Clear the local storage
clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

loadList(LIST);
