import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import useDataFetching from "../hooks/useDataFetching";
import Lane from "./Lane";
import { AddIcon, ArrowRightIcon, CheckIcon } from "@chakra-ui/icons";

import CrudModal from "../../common/modals/CrudModal";
import ViewTask from "./ViewTask";

const lanes = [
  { id: 1, title: "To Do", icon: <AddIcon /> },
  { id: 2, title: "In Progress", icon: <ArrowRightIcon /> },
  { id: 3, title: "Review", icon: <ArrowRightIcon /> },
  { id: 4, title: "Done", icon: <CheckIcon /> },
];

const URL =
  "https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks";

function onDragStart(e, id) {
  e.dataTransfer.setData("id", id);
}

function onDragOver(e) {
  e.preventDefault();
}
const Board = () => {
  const [loading, error, data] = useDataFetching(URL);
  const [tasks, setTasks] = useState([]);
  const [inputs, setInputs] = useState({ id: "", title: "", body: "" });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setTasks(data);
  }, [data]);

  function onDrop(e, laneId) {
    const id = e.dataTransfer.getData("id");
    const updatedTasks = tasks.filter((task) => {
      if (task.id.toString() === id) {
        task.lane = laneId;
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleInputChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleUpdateTask(newTask) {
    if (!newTask.hasOwnProperty("laneId")) {
      newTask["lane"] = 1;
    }
    const updatedTasks = tasks.filter((task) => task.id !== newTask.id);
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
    setInputs({ id: "", title: "", body: "" });
  }

  useEffect(() => {
    setInputs({ id: "", title: "", body: "" });
  }, [isOpen]);

  return (
    <>
      <CrudModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Add Task"}
        body={
          <ViewTask
            inputs={inputs}
            onClose={onClose}
            handleChange={handleInputChange}
            handleSubmit={handleUpdateTask}
          />
        }
      />
      <Box h={400} margin={5}>
        <Flex>
          <Text as="b" fontSize="lg">
            Project Tasks
          </Text>
          <Spacer />
          <Button leftIcon={<AddIcon />} onClick={onOpen}>
            New
          </Button>
        </Flex>
        <HStack spacing={5} align="stretch" mt={2}>
          {lanes.map((lane) => (
            <Lane
              key={lane.id}
              laneId={lane.id}
              title={lane.title}
              loading={loading}
              error={error}
              taskState={inputs}
              setTaskState={setInputs}
              tasks={tasks.filter((task) => task.lane === lane.id)}
              handleEditTask={handleInputChange}
              handleUpdateTask={handleUpdateTask}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default Board;
