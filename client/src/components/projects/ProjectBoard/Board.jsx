import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import useDataFetching from "../hooks/useDataFetching";
import Lane from "./Lane";

const lanes = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Review" },
  { id: 4, title: "Done" },
];

const URL =
  "https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks";

function onDragStart(e, id) {
  e.dataTransfer.setData("id", id);
}

function onDragOver(e) {
  e.preventDefault();
}
const Board = () => {
  const [loading, error, data] = useDataFetching(URL);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  function onDrop(e, laneId) {
    const id = e.dataTransfer.getData("id");
    const updatedTasks = tasks.filter((task) => {
      if (task.id.toString() === id) {
        task.lane = laneId;
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <>
    <Box h={400} margin={5}>
      <Text as='b' fontSize='lg' >Project Tasks</Text>
      <HStack spacing={10} align='stretch' mt={2}>
      {lanes.map((lane) => (
        <Lane
        key={lane.id}
        laneId={lane.id}
        title={lane.title}
        loading={loading}
        error={error}
        tasks={tasks.filter((task) => task.lane === lane.id)}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        />
        ))}
          </HStack>
    </Box>
        </>
  );
};

export default Board;
