import { Box, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Lane from "./Lane";
import { AddIcon, ArrowRightIcon, CheckIcon } from "@chakra-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { getTasksByProjectName, editProject } from "../projectSlice";
import { editTask } from "../../tasks/taskSlice";
import { useUpdateTaskMutation } from "../../../services/tasksApi";

const lanes = [
  { id: 1, title: "To Do", icon: <AddIcon /> },
  { id: 2, title: "In Progress", icon: <ArrowRightIcon /> },
  { id: 3, title: "Review", icon: <ArrowRightIcon /> },
  { id: 4, title: "Done", icon: <CheckIcon /> },
];

const URL =
  "https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks";

function onDragStart(e, id) {
  e.dataTransfer.setData("_id", id);
}

function onDragOver(e) {
  e.preventDefault();
}
const Board = ({ tasks }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [updateTask] = useUpdateTaskMutation();

  const [inputs, setInputs] = useState({ id: "", title: "", body: "" });

  function onDrop(e, laneId) {
    const id = e.dataTransfer.getData("_id");
    const updatedTask = { ...tasks.filter((task) => task._id == id)[0] };
    updatedTask.lane = laneId;
    if (token) {
      updateTask({ task: updatedTask, token: token })
        .unwrap()
        .then((payload) => {
          dispatch(editTask(updatedTask));
        });
    } else {
      alert("Please login");
    }
  }

  return (
    <>
      <Box h={400}>
        <HStack spacing={5} align="stretch" mt={2}>
          {lanes.map((lane) => (
            <Lane
              key={lane.id}
              laneId={lane.id}
              title={lane.title}
              taskState={inputs}
              setTaskState={setInputs}
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
