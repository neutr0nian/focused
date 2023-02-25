import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    {
      _id: nanoid(),
      name: "Machine Learning",
      delete: false,
      created: new Date().toLocaleDateString(),
      totalTasks: 2,
      pendingTasks: 1,
      deadline: new Date().toLocaleDateString(),
      userEmails: ["chavanpratik.pc@gmail"],
      tasks: [
        {
          _id: nanoid(),
          title: "Write an article",
          body: "Article writing is a very tough job",
          status: "pending",
          lane: 1,
        },
        {
          _id: nanoid(),
          title: "Complete chapter 1",
          body: "Medical science chapter 1",
          status: "completed",
          lane: 4,
        },
      ],
    },
    {
      _id: nanoid(),
      name: "Database Systems",
      delete: false,
      created: new Date().toLocaleDateString(),
      totalTasks: 1,
      pendingTasks: 1,
      deadline: new Date().toLocaleDateString(),
      userEmails: ["chavanpratik.pc@gmail"],
      tasks: [
        {
          _id: nanoid(),
          title: "Write test cases",
          body: "Test cases for query optimization",
          status: "pending",
          lane: 1,
        },
      ],
    },
    {
      _id: nanoid(),
      name: "CSE 611",
      delete: false,
      created: new Date().toLocaleDateString(),
      totalTasks: 1,
      pendingTasks: 1,
      deadline: new Date().toLocaleDateString(),
      userEmails: ["pchavan4@gmail"],
      tasks: [
        {
          _id: nanoid(),
          title: "Create a on-boarding documentation",
          body: "Write a readme file",
          status: "pending",
          lane: 1,
        },
      ],
    },
  ],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: {
      reducer(state, action) {
        state.projects = action.payload;
      },
    },
    addProject: {
      reducer(state, action) {
        state.projects.push(action.payload);
      },
      prepare({ name, created, deadline }) {
        return {
          payload: {
            _id: nanoid(),
            name,
            created,
            deadline,
            tasks: [],
            delete: false,
            totalTasks: 0,
            pendingTasks: 0,
          },
        };
      },
    },
    editProject: {
      reducer(state, action) {
        const { _id } = action.payload;
        const projects = state.projects.filter(
          (project) => project._id !== _id
        );
        state.projects = [...projects, action.payload];
      },
    },
    addTask: {},
    deleteProject: {
      reducer(state, action) {
        const { _id } = action.payload;

        state.projects = state.projects.map((project) => {
          if (project._id == _id) {
            project.delete = true;
          }
          return project;
        });
      },
    },
  },
});

export const selectAllProjects = (state) =>
  state.projects.projects.filter((project) => project.delete !== true);

export const getTasksByProjectName = (state, name) => {
  const project = state.projects.projects.filter(
    (project) => project.name === name
  );
  return project[0].tasks;
};

export const { setProjects, addProject, editProject, deleteProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
