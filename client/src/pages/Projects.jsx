import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProjectForm, ProjectTable } from "../components/projects";
import { setProjects } from "../components/projects/projectSlice";
import { useGetProjectsQuery } from "../services/projectsApi";
const Projects = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { data, isLoading, isSuccess } = useGetProjectsQuery(token);

  useEffect(() => {
    if (isSuccess) dispatch(setProjects(data.data));
  }, [isSuccess]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={4}>
      <Flex mb={2}>
        <Text as="b" fontSize="lg">
          Projects
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
        <ProjectForm isOpen={isOpen} onClose={onClose} />
      </Flex>
      {isLoading ? "Loading..." : <ProjectTable />}
    </Box>
  );
};

export default Projects;
