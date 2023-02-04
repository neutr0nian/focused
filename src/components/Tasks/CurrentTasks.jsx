import {
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";

const CurrentTasks = ({ tasks, setTasks, setCompletedTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({
    value: false,
    id: "",
  });

  const [inputs, setInputs] = useState({ id: "", name: "", note: "" });

  const handleAddTasks = (task) => {
    setTasks([...tasks, { id: String(tasks.length + 1), ...task }]);
    setInputs({ id: "", name: "", note: "" });
  };

  const handleChange = (e) => {
    if (e.target.name === "name")
      setInputs({ ...inputs, name: e.target.value });
    else {
      setInputs({ ...inputs, note: e.target.value });
    }
  };

  const handleEditForm = (values) => {
    if (values) {
      let updatedTasks = tasks.map((task) => {
        if (task.id == values.id) {
          console.log("found the task", task);
          task.name = values.name;
          task.note = values.note;
        }
        return task;
      });
      setTasks(updatedTasks);
    }

    setEditForm({ value: false, id: "" });
    setInputs({ id: "", name: "", note: "" });
  };

  const handleCompletedTasks = (completedTask) => {
    setCompletedTasks((prevTasks) => [...prevTasks, completedTask]);
    let updatedTasks = tasks.filter((task) => task.id !== completedTask.id);
    setTasks(updatedTasks);
  };

  return (
    <Box mt={4}>
      <VStack align="stretch">
        {tasks.length &&
          tasks.map((task) => (
            <>
              {editForm?.id !== task?.id && (
                <TaskCard
                  task={task}
                  type="current"
                  setEditForm={setEditForm}
                  setInputs={setInputs}
                  handleCompletedTasks={handleCompletedTasks}
                />
              )}
              {editForm.id === task.id && (
                <AddTask
                  key={task.id}
                  editForm={{ ...editForm, handle: handleEditForm }}
                  inputs={inputs}
                  handleChange={handleChange}
                  addTask={handleAddTasks}
                  hideForm={setShowForm}
                />
              )}
            </>
          ))}

        {!editForm.value && showForm && (
          <AddTask
            editForm={false}
            inputs={inputs}
            handleChange={handleChange}
            addTask={handleAddTasks}
            hideForm={setShowForm}
          />
        )}
        {!showForm && !editForm.value && (
          <Button
            h={12}
            colorScheme="teal"
            onClick={() => setShowForm(!showForm)}
          >
            Add Task
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default CurrentTasks;
