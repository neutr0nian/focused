import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Task from "./Task";

const Lane = ({
  laneId,
  title,
  loading,
  error,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <Box
      borderRadius={6}
      border="0.5px solid gray"
      onDragOver={onDragOver}
      onDrop={(e)=>onDrop(e, laneId)}
      p={2}
      minW={300}
    >
      <Text as="b">{title}</Text>
      <Divider marginY={2} />
      {loading || error ? (
        <span>{error || 'Loading'}</span>
      ):(
        <VStack spacing={4}>
{
        tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            body={task.body}
            onDragStart={onDragStart}
            />
        ))
}
            </VStack>
      )}
    </Box>
  );
};

export default Lane;
