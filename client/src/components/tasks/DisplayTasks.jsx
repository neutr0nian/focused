import { CheckIcon, DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Options from "../Options";
import CurrentTasks from "./CurrentTasks";
import CompletedTasks from "./CompletedTasks";
import { clearTasks } from "./taskSlice";
import { useDispatch } from "react-redux";
import ConfirmDialog from "../ConfirmDialog";

const menuOptions = [
  {
    name: "Completed Tasks",
    isVisible: true,
    icon: <CheckIcon />,
  },
  {
    name: "Ongoing Tasks",
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasksType, setTasksType] = useState("ongoing");

  const [alert, setAlert] = useState({
    heading: "",
    message: "",
    color: "",
    action: "",
  });

  const handleClearTasks = () => {
    dispatch(clearTasks({ type: tasksType }));
    onClose();
  };

  const handleTasksType = () => {
    if (tasksType == "ongoing") {
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
      setTasksType("ongoing");
      menuOptions.map((option) => {
        if (option.name === "Ongoing Tasks") {
          option.isVisible = false;
        } else {
          option.isVisible = true;
        }
        return option;
      });
    }
  };

  function handleDialog(heading, message, color, text, action) {
    setAlert({
      heading: heading,
      message: message,
      color: color,
      btnText: text,
      action: action,
    });
    onOpen();
  }

  const menuActions = {
    "Completed Tasks": handleTasksType,
    "Ongoing Tasks": handleTasksType,
    "Delete All": () =>
      handleDialog(
        "Delete All?",
        "Are you sure you want to delete all the tasks?",
        "red",
        "Delete",
        handleClearTasks
      ),
  };

  return (
    <Box mt={4}>
      <ConfirmDialog onClose={onClose} alert={alert} isOpen={isOpen} />
      <Flex alignItems="baseline" mb={2}>
        <Heading size="md">
          {tasksType.charAt(0).toUpperCase() + tasksType.slice(1)} Tasks
        </Heading>
        <Spacer />
        <Options
          options={menuOptions}
          actions={menuActions}
          icon={<HamburgerIcon />}
        />
      </Flex>
      <Divider />
      {tasksType === "ongoing" ? <CurrentTasks /> : <CompletedTasks />}
    </Box>
  );
};

export default DisplayTasks;
