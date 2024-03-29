import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Task from "./Task";

const Lane = ({
  laneId,
  title,
  loading,
  error,
  tasks,
  taskState,
  setTaskState,
  handleEditTask,
  handleUpdateTask,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <Box
      borderRadius={6}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, laneId)}
      p={2}
      w={500}
      bg="gray.100"
      minH={550}
    >
      <Text fontWeight={550} color={"gray.700"} ml={2}>
        {title}
      </Text>
      <Divider marginY={2} />
      {loading || error ? (
        <span>{error || "Loading"}</span>
      ) : (
        <VStack spacing={2}>
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              inputState={taskState}
              setInputState={setTaskState}
              handleEdit={handleEditTask}
              handleUpdate={handleUpdateTask}
              onDragStart={onDragStart}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Lane;
