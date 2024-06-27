import {
  ADD_TASK,
  CALCULATE_TOTAL_TASKS,
  REMOVE_TASK,
  TOGGLE_TASK,
} from "./actions";

const initialState = { tasks: [] };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id != parseInt(action.payload),
        ),
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, completed: !task.completed };
          } else {
            return task;
          }
        }),
      };
    case CALCULATE_TOTAL_TASKS:
      return { ...state, totalTasks: state.tasks.length };
    default:
      return state;
  }
};

export default taskReducer;
