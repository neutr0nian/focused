import {
  Box,
  Button,
  Container,
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
  const project = location.state.project;
  const tasks = useSelector((state) => getTasksByProjectId(state, project._id));

  return (
    <div>
      <CrudModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Add Task"}
        body={<AddTask projectId={project._id} hideForm={onClose} />}
      />
      <Container my={5} w="max-content" maxW={600}>
        <Text fontSize="3xl" fontWeight={900}>
          {project.name}
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight={500}>
          Starts on <span>March 23</span> & Ends on <span>July 23</span>
        </Text>
        <Text mt={3} fontSize="md" color="gray.700" fontWeight={500}>
          Computer Science and engineering department project to build a neural
          network for automotive vehicles
        </Text>
      </Container>
      <Container
        maxW="1450"
        border="1px solid gray"
        borderRadius={7}
        borderWidth="0.5px"
        p={0}
        my={3}
      >
        <Flex bg="gray.100" px={4} py={2} borderTopRadius={7}>
          <Text fontWeight={550} color={"gray.700"}>
            Project Tasks
          </Text>
          <Spacer />
          <Button
            leftIcon={<AddIcon />}
            size="sm"
            colorScheme="teal"
            variant="outline"
            onClick={onOpen}
          >
            New
          </Button>
        </Flex>
        <Board tasks={tasks} />
      </Container>
    </div>
  );
};

export default ProjectBoard;
