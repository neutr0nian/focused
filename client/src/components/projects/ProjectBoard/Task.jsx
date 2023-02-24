import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateTaskMutation } from "../../../services/tasksApi";
import { trimString } from "../../../utils/helper";
import CrudModal from "../../common/modals/CrudModal";
import AddTask from "../../tasks/AddTask";
import { editTask } from "../../tasks/taskSlice";

const Task = ({ task, setInputState, handleUpdate, onDragStart }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateTask] = useUpdateTaskMutation();

  function handleDeleteTask() {
    if (confirm("Are you sure you want to remove the task?")) {
      console.log("Deleting task: ", task._id);
      updateTask({ task: task, token: token })
        .unwrap()
        .then((payload) => {
          dispatch(editTask({ ...task, delete: true }));
        });
    }
  }
  return (
    <>
      <CrudModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Task Details"}
        handleSubmit={handleUpdate}
        body={
          <AddTask
            task={task}
            editForm={{ handle: onClose }}
            hideForm={onClose}
          />
        }
      />
      <Box
        bg="white"
        border="1px solid gray"
        borderWidth="0.4px"
        p={3}
        w="full"
        draggable
        cursor="pointer"
        borderRadius={6}
        onDragStart={(e) => onDragStart(e, task._id)}
      >
        <Flex alignItems="center">
          <Text as="b" fontSize="md">
            {task.title.length > 30
              ? trimString(task.title, 30) + "..."
              : task.title}
          </Text>
          <Spacer />
          <CloseIcon fontSize="xs" onClick={() => handleDeleteTask()} />
        </Flex>
        <Text
          fontSize="sm"
          onClick={() => {
            setInputState(task);
            onOpen();
          }}
        >
          {task.body}
        </Text>
      </Box>
    </>
  );
};

export default Task;
