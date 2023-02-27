import React from "react";
import { Box, Container, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { Music, Timer } from "../components";
import { useGetTasksQuery } from "../services/tasksApi";
import { setTasks } from "../components/tasks/taskSlice";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const token = localStorage.getItem("token");
  const { data, isSuccess, isError } = useGetTasksQuery(token);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTasks(data.data));
    }
    if (isError) {
      toast({
        title: "Login required",
        status: "warning",
        description: "Please login to keep your tasks stored",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <Container maxW={600} mt={4}>
        <Timer />
      </Container>
    </>
  );
};

export default Homepage;
