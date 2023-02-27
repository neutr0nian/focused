import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MoreVertical } from "react-feather";
import { useDispatch } from "react-redux";
import { useUpdateTaskMutation } from "../../../services/tasksApi";
import { trimString } from "../../../utils/helper";
import CrudModal from "../../common/modals/CrudModal";
import AddTask from "../../tasks/AddTask";
import { editTask } from "../../tasks/taskSlice";

const Task = ({ task, setInputState, handleUpdate, onDragStart }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateTask] = useUpdateTaskMutation();

  function handleDeleteTask() {
    if (confirm("Are you sure you want to remove the task?")) {
      console.log("Deleting task: ", task._id);
      updateTask({ task: task, token: token })
        .unwrap()
        .then((payload) => {
          dispatch(editTask({ ...task, delete: true }));
        });
    }
  }

  return (
    <>
      <CrudModal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        title={"Task Details"}
        handleSubmit={handleUpdate}
        body={
          <AddTask
            task={task}
            editForm={{ handle: onClose }}
            hideForm={onClose}
          />
        }
      />
      <Box
        p={3}
        bg="white"
        w="full"
        draggable
        shadow="sm"
        borderColor="gray.300"
        borderWidth="0.2px"
        cursor="pointer"
        borderRadius={6}
        onDragStart={(e) => onDragStart(e, task._id)}
      >
        <Grid
          templateRows="repeat(2,0.5fr)"
          templateColumns="[first] 45% [second]45% [third]10%"
          gap={1}
        >
          <GridItem
            colSpan={2}
            onClick={() => {
              setInputState(task);
              onOpen();
            }}
          >
            <Text as="b" fontSize="md">
              {task.title.length > 30
                ? trimString(task.title, 30) + "..."
                : task.title}
            </Text>
            <Text pb={2} fontSize="sm">
              {task.body}
            </Text>
          </GridItem>
          <GridItem justifySelf="center" rowSpan={2} colSpan={1}>
            <MoreVertical
              color="#404040"
              size={20}
              onClick={() => handleDeleteTask()}
            />
          </GridItem>
          <GridItem
            colSpan={2}
            onClick={() => {
              setInputState(task);
              onOpen();
            }}
          >
            <Text fontSize="xs" color="gray.600">
              Pratik Chavan
            </Text>
            <Text fontSize="xs" color="gray.600">
              2 days ago
            </Text>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Task;
