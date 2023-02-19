import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { selectTasksByStatus } from "./taskSlice";

const CompletedTasks = () => {
  const tasks = useSelector((state) => selectTasksByStatus(state, "completed"));

  return (
    <>
      <Box mt={4}>
        <VStack align="stretch">
          {tasks.length ? (
            tasks.map((task) => <TaskCard task={task} type="completed" />)
          ) : (
            <Center p={4}>
              <Text fontSize="lg">No completed tasks</Text>
            </Center>
          )}
        </VStack>
      </Box>
    </>
  );
};

export default CompletedTasks;
