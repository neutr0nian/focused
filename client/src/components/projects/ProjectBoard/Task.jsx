import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import CrudModal from "../../common/modals/CrudModal";
import ViewTask from "./ViewTask";

const Task = ({ task, inputState, setInputState, handleEdit, handleUpdate, onDragStart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() =>{
    setInputState({id:'', title:'', body:''})
  },[onClose])

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
        bg="gray.200"
        p={3}
        draggable
        cursor='pointer'
        borderRadius={6}
        onDragStart={(e) => onDragStart(e, task.id)}
        onClick={()=>{
          setInputState(task);
          onOpen()
        }}
      >
        <Text as="b" fontSize="md">
          {task.title}
        </Text>
        <Text fontSize="md">{task.body}</Text>
      </Box>
    </>
  );
};

export default Task;
