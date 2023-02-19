import {
  Box,
  Button,
  ScaleFade,
  Slide,
  SlideFade,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateTaskMutation } from "../../services/tasksApi";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import { addTask, selectTasksByStatus } from "./taskSlice";

const CurrentTasks = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => selectTasksByStatus(state, "pending"));

  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({
    task: {},
    value: false,
  });

  const handleEditForm = () => {
    setEditForm({ value: false, id: "" });
  };

  const handleCompletedTasks = (completedTask) => {};

  return (
    <Box mt={4}>
      <VStack align="stretch">
        {tasks.length ? (
          tasks.map((task) => (
            <>
              {editForm?.task?._id !== task?._id && (
                <TaskCard
                  task={task}
                  type="current"
                  setEditForm={setEditForm}
                  handleCompletedTasks={handleCompletedTasks}
                />
              )}
              {editForm.task?._id === task._id && (
                <ScaleFade in={editForm.task?._id === task._id}>
                  <AddTask
                    key={task._id}
                    task={editForm?.task}
                    editForm={{ ...editForm, handle: handleEditForm }}
                    hideForm={setShowForm}
                  />
                </ScaleFade>
              )}
            </>
          ))
        ) : (
          <Text>No tasks added</Text>
        )}

        {!editForm.value && showForm && (
          <SlideFade in={showForm} offsetY="-40px">
            <AddTask editForm={false} hideForm={setShowForm} />
          </SlideFade>
        )}
        {!showForm && !editForm.value && (
          <ScaleFade initialScale={0.9} in={!showForm && !editForm.value}>
            <Button
              width="full"
              h={12}
              colorScheme="teal"
              onClick={() => setShowForm(!showForm)}
            >
              Add Task
            </Button>
          </ScaleFade>
        )}
      </VStack>
    </Box>
  );
};

export default CurrentTasks;
