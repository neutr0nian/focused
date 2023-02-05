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

const TaskCard = ({task, type, setEditForm, handleCompletedTasks, setInputs}) => {
  return (
    <Box p={3} bg="gray.200" borderRadius={7} key={task.id}>
      <Flex>
        <Box>
          <Text ml={2} size="md" as="b">
            {task.name}
          </Text>
          {task.note && (
            <>
              <Text p={2}>Notes: {task.note}</Text>
            </>
          )}
        </Box>
        <Spacer />
        <ButtonGroup>
            {type === 'current' ? (
                <>
          <Tooltip hasArrow label="Completed">
            <IconButton
              bg="white"
              icon={<CheckIcon />}
              onClick={() => {
                handleCompletedTasks(task);
              }}
            />
          </Tooltip>
          <Tooltip hasArrow label="Edit">
            <IconButton
              bg="white"
              icon={<EditIcon/>}
              onClick={() => {
                setInputs(task);
                setEditForm({ value: true, id: task.id });
              }}
            />
          </Tooltip>
                </>

            ) : (
                <Tooltip hasArrow label="Restore task">
            <IconButton
              bg="white"
              icon={<RepeatIcon/>}
              onClick={() => {
                alert('Restoring');
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
