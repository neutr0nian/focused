import { CheckIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
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
import { editTask } from "./taskSlice";

const TaskCard = ({ task, type, setEditForm }) => {
  const dispatch = useDispatch();
  return (
    <Box p={3} bg="gray.200" borderRadius={7} key={task.id}>
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
                  icon={<CheckIcon />}
                  onClick={() => {
                    dispatch(editTask({ ...task, status: "completed" }));
                  }}
                />
              </Tooltip>
              <Tooltip hasArrow label="Edit">
                <IconButton
                  bg="white"
                  icon={<EditIcon />}
                  onClick={() => {
                    setEditForm({ task: task, value: true });
                  }}
                />
              </Tooltip>
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
