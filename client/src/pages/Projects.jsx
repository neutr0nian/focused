import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import { NewProject, ProjectTable } from "../components/projects";

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <Box p={4}>
        <Flex p={2}>
          <Text as="b" fontSize="lg">
            Projects
          </Text>
          <Spacer />
          <Button leftIcon={<AddIcon />} onClick={onOpen}>
            New
          </Button>
          <NewProject isOpen={isOpen} onClose={onClose} />
        </Flex>
        <ProjectTable />
      </Box>
  );
};

export default Projects;
