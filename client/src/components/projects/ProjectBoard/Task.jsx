import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { trimString } from "../../../utils/helper";
import CrudModal from "../../common/modals/CrudModal";
import ViewTask from "./ViewTask";


const Task = ({ task, inputState, setInputState, handleEdit, handleUpdate, onDragStart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <CrudModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Task Details"}
        handleSubmit={handleUpdate}
        body={<ViewTask inputs={inputState} onClose={onClose} handleChange={handleEdit} handleSubmit={handleUpdate} />}
      />
      <Box
        bg="gray.100"
        p={3}
        draggable
        cursor='pointer'
        borderRadius={6}
        onDragStart={(e) => onDragStart(e, task.id)}
      >
        <Flex alignItems='center'>
        <Text as="b" fontSize="md">
          {task.title.length > 30 ? trimString(task.title, 30) + '...' : task.title}
        </Text>
          <Spacer/>
          <CloseIcon fontSize='xs' onClick={()=>alert('dlete?')}/>
        </Flex>
        <Text fontSize="md"  onClick={()=>{
          setInputState(task);
          onOpen()
        }}>{task.body}</Text>
      </Box>
    </>
  );
};

export default Task;
