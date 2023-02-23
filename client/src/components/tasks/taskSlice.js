import { createSlice, nanoid } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_TEST_BASE_URL + "/tasks";

const initialState = {
  tasks: [
    {
      _id: nanoid(),
      title: "Write an article",
      body: "Medium post at 4:00 pm",
      status: "ongoing",
      delete: false,
      lane: 1,
    },
    {
      _id: nanoid(),
      title: "Write a story",
      body: "Medium post at 4:00 pm",
      status: "completed",
      delete: false,
      lane: 1,
    },
  ],
  pendingTasks: [],
  completedTasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: {
      reducer(state, action) {
        state.tasks = action.payload;
      },
    },
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare({ _id, title, body }) {
        return {
          payload: {
            _id,
            title,
            body,
            status: "ongoing",
            delete: false,
          },
        };
      },
    },
    clearTasks: {
      reducer(state, action) {
        if (action.payload.type == "ongoing") {
          state.tasks.map((task) => {
            if (task.status == "ongoing") task.delete = true;
          });
        } else {
          state.tasks.map((task) => {
            if (task.status == "completed") task.delete = true;
          });
        }
      },
    },
    editTask: {
      reducer(state, action) {
        const { _id } = action.payload;
        const tasks = state.tasks.filter((task) => task._id !== _id);
        state.tasks = [...tasks, action.payload];
      },
    },
  },
});

export const { setTasks, addTask, clearTasks, editTask } = tasksSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectTasksByStatus = (state, status) =>
  state.tasks.tasks.filter(
    (task) => task.status === status && task.lane != 4 && !task.delete
  );

export const getTasksByProjectId = (state, _id) => {
  if (state?.tasks?.tasks)
    return state.tasks.tasks.filter(
      (task) => task.projectId === _id && !task.delete
    );
  else return [];
};

export default tasksSlice.reducer;
