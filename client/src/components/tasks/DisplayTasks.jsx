import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Options from "../Options";
import CurrentTasks from "./CurrentTasks";
import CompletedTasks from "./CompletedTasks";
import { useGetTasksQuery } from "../../services/tasksApi";
import { clearTasks, selectAllTasks, setTasks } from "./taskSlice";
import { useDispatch, useSelector } from "react-redux";

const menuOptions = [
  {
    name: "Completed Tasks",
    isVisible: true,
    icon: <CheckIcon />,
  },
  {
    name: "Pending Tasks",
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
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { data, isSuccess } = useGetTasksQuery(token);

  const [tasksType, setTasksType] = useState("pending");

  const tasks = useSelector(selectAllTasks);

  const handleClearTasks = () => {
    dispatch(clearTasks({ type: tasksType }));
  };

  const handleTasksType = () => {
    if (tasksType == "pending") {
      setTasksType("completed");
      menuOptions.map((option) => {
        if (option.name === "Completed Tasks") {
          option.isVisible = false;
        } else {
          option.isVisible = true;
        }
        return option;
      });
    } else {
      setTasksType("pending");
      menuOptions.map((option) => {
        if (option.name === "Pending Tasks") {
          option.isVisible = false;
        } else {
          option.isVisible = true;
        }
        return option;
      });
    }
  };

  const menuActions = {
    "Completed Tasks": handleTasksType,
    "Pending Tasks": handleTasksType,
    "Delete All": handleClearTasks,
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTasks(data.data));
    }
  }, [isSuccess]);
  return (
    <Box mt={4}>
      <Flex alignItems="baseline" mb={2}>
        <Heading size="md">
          {tasksType.charAt(0).toUpperCase() + tasksType.slice(1)} Tasks
        </Heading>
        <Spacer />
        <Options options={menuOptions} actions={menuActions} />
      </Flex>
      <Divider />
      {tasksType === "pending" ? <CurrentTasks /> : <CompletedTasks />}
    </Box>
  );
};

export default DisplayTasks;
