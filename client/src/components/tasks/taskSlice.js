import { createSlice, nanoid } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_TEST_BASE_URL + "/tasks";

const initialState = {
  tasks: [],
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
      prepare({ _id, title, body, lane, projectId }) {
        return {
          payload: {
            _id,
            title,
            body,
            lane: lane,
            status: "ongoing",
            deleted: false,
            projectId: projectId,
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

export const selectTasksByProjectId = (state, _id) =>
  state.tasks.tasks.filter((task) => task.projectId === _id && !task.delete);

export default tasksSlice.reducer;
