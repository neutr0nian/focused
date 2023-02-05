import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

const projects = [
  {
    id: 1,
    name: "Capstone Project",
    tasks: 10,
    pending: 4,
    started: "March 27",
  },
  {
    id: 2,
    name: "Neural Networks",
    tasks: 7,
    pending: 3,
    started: "February 27",
  },
  {
    id: 3,
    name: "Cigna",
    tasks: 10,
    pending: 4,
    started: "April 20",
  },
  {
    id: 4,
    name: "Fedx",
    tasks: 20,
    pending: 17,
    started: "March 17",
  },
];
const ProjectTable = () => {
  const navigate = useNavigate();
  
  return (
    <TableContainer border="0.4px solid gray" borderRadius={6}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Project</Th>
            <Th>Started at</Th>
            <Th>Total Tasks</Th>
            <Th> Pending Tasks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            <Tr
              cursor="pointer"
              key={project.id}
              onClick={() => navigate(`/projects/board?pid=${project.id}`)}
            >
              <Td>{project.name}</Td>
              <Td>{project.started}</Td>
              <Td>{project.tasks}</Td>
              <Td>{project.pending}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Project</Th>
            <Th>Started at</Th>
            <Th>Total Tasks</Th>
            <Th> Pending Tasks</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
