import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Options from "../Options";
import { editTask } from "./taskSlice";
import { MoreVertical } from "react-feather";
import ConfirmDialog from "../ConfirmDialog";

const menuOptions = [
  {
    name: "Delete",
    isVisible: true,
    icon: <DeleteIcon />,
  },
  {
    name: "Remove",
    isVisible: true,
    icon: <MinusIcon />,
  },
];

const TaskCard = ({ task, type, setEditForm }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [alert, setAlert] = useState({
    heading: "",
    message: "",
    color: "",
    action: "",
  });

  function handleDelete() {
    dispatch(editTask({ ...task, delete: true }));
    onClose();
  }

  function handleRemove() {
    dispatch(editTask({ ...task, status: "backlog" }));
    onClose();
  }

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

  function handleComplete() {
    dispatch(
      editTask({
        ...task,
        status: "completed",
        completed: new Date(),
      })
    );
    onClose();
  }

  function handleRestore() {
    dispatch(editTask({ ...task, status: "ongoing", completed: "" }));
    onClose();
  }

  const menuActions = {
    Delete: () =>
      handleDialog(
        "Delete task?",
        "Are you sure you want to delete the task?",
        "red",
        "Delete",
        handleDelete
      ),
    Remove: () =>
      handleDialog(
        "Remove task?",
        "Are you sure you want to remove the task? The task will no longer be an ongoing task",
        "red",
        "Remove",
        handleRemove
      ),
  };

  return (
    <Box p={3} bgColor="#F1F0EA" borderRadius={7} key={task.id}>
      <ConfirmDialog onClose={onClose} alert={alert} isOpen={isOpen} />
      <Flex>
        <Box>
          <Text ml={2} size="md" as="b">
            {task.title}
          </Text>
          {task.body && (
            <>
              <Text p={2}>{task.body}</Text>
            </>
          )}
        </Box>
        <Spacer />
        <ButtonGroup>
          {type === "current" ? (
            <>
              <Tooltip hasArrow label="Completed">
                <IconButton
                  bg="white"
                  _hover={{
                    color: "green",
                  }}
                  icon={<CheckIcon />}
                  onClick={() => {
                    handleDialog(
                      "Complete Task?",
                      "Are you sure you want to mark this task as completed?",
                      "green",
                      "Complete",
                      handleComplete
                    );
                  }}
                />
              </Tooltip>
              <Tooltip hasArrow label="Edit">
                <IconButton
                  bg="white"
                  _hover={{
                    color: "orange",
                  }}
                  icon={<EditIcon />}
                  onClick={() => {
                    setEditForm({ task: task, value: true });
                  }}
                />
              </Tooltip>
              <Options
                options={menuOptions}
                actions={menuActions}
                icon={<MoreVertical />}
              />
            </>
          ) : (
            <Tooltip hasArrow label="Restore task">
              <IconButton
                bg="white"
                icon={<RepeatIcon />}
                onClick={() => {
                  handleDialog(
                    "Restore Task?",
                    "Are you sure you want to restore this task?",
                    "green",
                    "Restore",
                    handleRestore
                  );
                }}
              />
            </Tooltip>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default TaskCard;
