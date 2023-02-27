import {
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
import { selectTasksByProjectId } from "../components/tasks/taskSlice";
import { months } from "../constants/calendar";

const ProjectBoard = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const project = location.state.project;
  const tasks = useSelector((state) =>
    selectTasksByProjectId(state, project._id)
  );

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
          Starts on{" "}
          <span>
            {months[new Date(project.created).getMonth()]}{" "}
            {new Date(project.created).getDate()}
          </span>{" "}
          & Ends on {months[new Date(project.deadline).getMonth()]}{" "}
          {new Date(project.deadline).getDate()}
        </Text>
        <Text mt={3} fontSize="md" color="gray.700" fontWeight={500}>
          {project?.description}
        </Text>
      </Container>
      <Container
        minW={1250}
        width={[
          900,1250,1450
        ]}
        border="1px solid gray"
        borderRadius={7}
        borderWidth="0.5px"
        p={0}
        my={3}
      >
        <Flex
          bg="gray.100"
          px={4}
          py={2}
          borderTopRadius={7}
          alignItems="center"
        >
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
            Task
          </Button>
        </Flex>
        <Board tasks={tasks} />
      </Container>
    </div>
  );
};

export default ProjectBoard;
