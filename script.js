import { createStore } from "redux";
import taskReducer from "./taskReducer";
import { addTask, calculateTotalTask, removeTask, toggleTask } from "./actions";

const store = createStore(taskReducer);

store.subscribe(() => {
  console.log(store.getState());
  renderTasks();
});

const addTaskForm = document.querySelector("#add-task-form");
const listTask = document.querySelector("#list-task");
const totalTask = document.querySelector("#total-task");
const removeTaskForm = document.querySelector("#remove-task-form");

const addFormHandler = (e) => {
  e.preventDefault();
  const taskTitle = document.querySelector("#task-title").value;
  const description = document.querySelector("#description").value;

  store.dispatch(
    addTask({
      id: store.getState().tasks.length + 1,
      taskTitle,
      description,
      completed: false,
    }),
  );
  store.dispatch(calculateTotalTask());
};

addTaskForm.addEventListener("submit", addFormHandler);

const removeFormHandler = (e) => {
  e.preventDefault();
  const idToRemove = document.querySelector("#id-to-remove").value;
  store.dispatch(removeTask(idToRemove));
  store.dispatch(calculateTotalTask());
};
removeTaskForm.addEventListener("submit", removeFormHandler);

function renderTasks() {
  const state = store.getState();

  listTask.innerHTML = state.tasks
    .map(
      (task) =>
        `<li><input class="isCompleteCheckbox" type="checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""}/>${task.id}.${task.taskTitle}: ${task.description} - ${task.completed ? "completed" : ""}</li>`,
    )
    .join("");

  const isCompleteCheckbox = document.querySelectorAll(".isCompleteCheckbox");
  isCompleteCheckbox.forEach((checkBoxes) => {
    checkBoxes.addEventListener("change", (e) => {
      const checkboxId = Number(e.target.getAttribute("data-id"));
      store.dispatch(toggleTask(checkboxId));
    });
  });

  totalTask.textContent = state.totalTasks;
}

renderTasks();
