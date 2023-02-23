import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Board } from "../components/projects";
import CrudModal from "../components/common/modals/CrudModal";
import { AddIcon } from "@chakra-ui/icons";
import AddTask from "../components/tasks/AddTask";
import { getTasksByProjectId } from "../components/tasks/taskSlice";

const ProjectBoard = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projectId = location.state.id;
  const tasks = useSelector((state) => getTasksByProjectId(state, projectId));

  return (
    <div>
      <CrudModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Add Task"}
        body={<AddTask projectId={projectId} hideForm={onClose} />}
      />
      <Box margin={5}>
        <Flex>
          <Text as="b" fontSize="lg">
            Project Tasks
          </Text>
          <Spacer />
          <Button
            leftIcon={<AddIcon />}
            size="sm"
            colorScheme="teal"
            onClick={onOpen}
          >
            New
          </Button>
        </Flex>
        <Board tasks={tasks} />
      </Box>
    </div>
  );
};

export default ProjectBoard;
