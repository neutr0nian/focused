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
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import Options from "../Options";
import { editTask } from "./taskSlice";
import { MoreVertical } from "react-feather";

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
  const dispatch = useDispatch();

  function handleDelete() {
    confirm("Are you sure you want to delete");
  }

  function handleRemove() {
    confirm("Are you sure you want to remove");
  }

  const menuActions = {
    Delete: handleDelete,
    Remove: handleRemove,
  };
  return (
    <Box p={3} bgColor="#F1F0EA" borderRadius={7} key={task.id}>
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
                    dispatch(editTask({ ...task, status: "completed" }));
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
                  dispatch(editTask({ ...task, status: "pending" }));
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
