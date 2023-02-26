import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Container,
  Flex,
  Text,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { selectAllProjects, deleteProject } from "./projectSlice";
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ProjectForm from "./ProjectForm";
import Options from "../Options";
import { MoreVertical } from "react-feather";

const menuOptions = [
  {
    name: "Edit Project",
    isVisible: true,
    icon: <EditIcon />,
  },
  {
    name: "Mark Completed",
    isVisible: true,
    icon: <CheckIcon />,
  },
  {
    name: "Delete Project",
    isVisible: true,
    icon: <DeleteIcon />,
  },
];

const ProjectTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projects = useSelector(selectAllProjects);

  const [projectToUpdate, setProjectToUpdate] = useState({});

  function updateProject(id) {
    setProjectToUpdate(getProjectById(id));
    onOpen();
  }

  function handleDeleteProject(id) {
    dispatch(deleteProject({ _id: id }));
  }

  function handleNewProject() {
    setProjectToUpdate(null);
    onOpen();
  }
  function getProjectById(id) {
    return projects.filter((project) => project._id === id)[0];
  }

  const menuActions = {
    "Edit Project": updateProject,
    "Mark Completed": updateProject,
    "Delete Project": handleDeleteProject,
  };

  return (
    <Container maxW={1450}>
      <Flex mb={2}>
        <Text as="b" fontSize="lg">
          Projects
        </Text>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          size="sm"
          colorScheme="teal"
          variant="outline"
          onClick={handleNewProject}
        >
          Project
        </Button>
        <ProjectForm
          project={projectToUpdate}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
      {projects && projects.length ? (
        <TableContainer border="0.4px solid gray" borderRadius={6}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Project</Th>
                <Th>Deadline</Th>
                <Th>Total Tasks</Th>
                <Th> Pending Tasks</Th>
                <Th> Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project) => (
                <Tr key={project._id}>
                  <Td
                    cursor="pointer"
                    onClick={() =>
                      navigate(`/projects/board?project=${project.name}`, {
                        state: {
                          project: project,
                        },
                      })
                    }
                    _hover={{
                      color: "teal.500",
                    }}
                  >
                    {project.name}
                  </Td>
                  <Td>{new Date(project.created).toLocaleDateString()}</Td>
                  <Td>{project.tasks.length}</Td>
                  <Td>{project.pendingTasks}</Td>
                  <Td>
                    <Options
                      options={menuOptions}
                      id={project._id}
                      actions={menuActions}
                      icon={<MoreVertical />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Project</Th>
                <Th>Deadline</Th>
                <Th>Total Tasks</Th>
                <Th> Pending Tasks</Th>
                <Th> Actions</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default ProjectTable;
