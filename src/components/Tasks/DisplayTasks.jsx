import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Options from "../Options";
import CurrentTasks from "./CurrentTasks";
import CompletedTasks from "./CompletedTasks";

const menuOptions = [
  {
    name: "Completed Tasks",
    isVisible: true,
    icon: <CheckIcon />,
  },
  {
    name: "Current Tasks",
    isVisible: false,
    icon: <CheckIcon />,
  },
  {
    name: "Delete All",
    isVisible: true,
    icon: <DeleteIcon />,
  },
];

const DisplayTasks = () => {
  const [tasksType, setTasksType] = useState("current");
  const [tasks, setTasks] = useState([
    {
      id: "1",
      name: "Write an article",
      note: "Medium post at 4:00 pm",
    },
    {
      id: "2",
      name: "Read a book",
      note: "Think like monk",
    },
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleClearTasks = () => {
    setTasks([]);
  };

  const handleTasksType = () => {
    if (tasksType == "current") {
      setTasksType("completed");
        menuOptions.map((option) => {
          if (option.name === "Completed Tasks") {
            option.isVisible = false;
          } else {
            option.isVisible = true;
          }
          return option;
        })
      
    } else {
      setTasksType("current");
        menuOptions.map((option) => {
          if (option.name === "Current Tasks") {
            option.isVisible = false;
          } else {
            option.isVisible = true;
          }
          return option;
        })
    }
  };

  const menuActions = {
    "Completed Tasks": handleTasksType,
    "Current Tasks": handleTasksType,
    "Delete All": handleClearTasks,
  };

  return (
    <Box mt={4}>
      <Flex alignItems="baseline" mb={2}>
        <Heading size="md">Tasks</Heading>
        <Spacer />
        <Options options={menuOptions} actions={menuActions} />
      </Flex>
      <Divider />
      {tasksType === "current" ? (
        <CurrentTasks tasks={tasks} setTasks={setTasks} setCompletedTasks={setCompletedTasks} />
      ) : (
        <CompletedTasks tasks={completedTasks} />
      )}
    </Box>
  );
};

export default DisplayTasks;
