import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProjectTable } from "../components/projects";
import { setProjects } from "../components/projects/projectSlice";
import { useGetProjectsQuery } from "../services/projectsApi";
const Projects = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { data, isLoading, isSuccess } = useGetProjectsQuery(token);

  useEffect(() => {
    if (isSuccess) dispatch(setProjects(data.data));
  }, [isSuccess]);

  return (
    <Box p={4}>
      {isLoading && <Spinner />}
      {isSuccess ? (
        <ProjectTable data={data.data} />
      ) : (
        "Please login to see your projects"
      )}
    </Box>
  );
};

export default Projects;
