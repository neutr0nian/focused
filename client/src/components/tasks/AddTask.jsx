import {
  Box,
  Input,
  VStack,
  Textarea,
  Spacer,
  Button,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../services/tasksApi";
import { addTask, editTask } from "./taskSlice";

const AddTask = ({ editForm, task, hideForm }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [createTask, { isSuccess: isCreateSuccess }] = useCreateTaskMutation();

  const [updateTask, { isSuccess: isUpdateSuccess }] = useUpdateTaskMutation();

  const title = useRef(null);
  const [inputs, setInputs] = useState({
    id: task?.id,
    title: task?.title,
    body: task?.body,
  });

  function handleChange(e) {
    if (e.target.name === "title")
      setInputs({ ...inputs, title: e.target.value });
    else {
      setInputs({ ...inputs, body: e.target.value });
    }
  }

  function handleAddTask() {
    if (token) {
      createTask({ task: inputs, token: token })
        .unwrap()
        .then((payload) => {
          dispatch(addTask(payload.data));
          setInputs({ id: "", title: "", body: "" });
          hideForm(true);
        });
    } else {
      alert("please log in to add task");
    }
  }

  function handleEditTask() {
    if (token) {
      updateTask({ task: { ...task, ...inputs }, token: token })
        .unwrap()
        .then((payload) => {
          dispatch(editTask({ ...task, ...inputs }));
          setInputs({ id: "", title: "", body: "" });
          editForm.handle();
        });
    } else {
      alert("Please login");
    }
  }

  useEffect(() => {
    title.current.focus();
  }, []);

  return (
    <Box bg="gray.100" border="1px gray" mb={2} borderRadius={7} p={4}>
      <VStack align="stretch">
        <Input
          placeholder="What are you working on?"
          bg="white"
          name="title"
          ref={title}
          value={inputs.title}
          onChange={handleChange}
        ></Input>
        <Textarea
          placeholder="Add note"
          name="note"
          bg="white"
          value={inputs.body}
          onChange={handleChange}
        ></Textarea>
        <Flex>
          <ButtonGroup>
            <Button
              hidden={task}
              colorScheme="teal"
              color="white"
              onClick={() => handleAddTask()}
            >
              Add
            </Button>
            <Button
              hidden={!task}
              colorScheme="teal"
              color="white"
              onClick={() => handleEditTask()}
            >
              Save
            </Button>
          </ButtonGroup>
          <Spacer />
          <Button
            colorScheme="red"
            color="white"
            onClick={() => {
              editForm.value ? editForm.handle() : hideForm(false);
            }}
          >
            Cancel
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AddTask;
