import React from "react";
import { Box, Container, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { Timer } from "../components";
import { useGetTasksQuery } from "../services/tasksApi";
import { setTasks } from "../components/tasks/taskSlice";
import { useDispatch } from "react-redux";
import { BarChart2, Clock, Table, Target } from "react-feather";

const features = [
  {
    icon: <Clock />,
    heading: "Timer",
    description:
      "Focus on the task using the timer and adjust the time needed according to the task you want to complete",
  },
  {
    icon: <Target />,
    heading: "Tasks",
    description:
      'You can add the task using the above "Add Task" button. After adding the task you can perform actions like edit, complete or restore',
  },
  {
    icon: <Table />,
    heading: "Projects",
    description:
      'You can add in the projects on the "Projects" page by filling a form. You can also add users on the project. After adding the users an email will be sent to their respective email address, please ask your teammate to login/signup on focused',
  },
  {
    icon: <BarChart2 />,
    heading: "Statistics",
    description: 'You can view your weekly progress on the "Statistics" page',
  },
];

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
      <Box bg="#F1F0EA" mt={40} py={10}>
        <Box w="xl" mx="auto">
          <Text fontSize="3xl" fontWeight={800}>
            Focused
          </Text>
          <Text color="gray.700">
            focused is a productivity tool that let's you manage your task
            efficiently with features like adding and managing tasks, creating
            and managing projects, adding your teammates on the project and much
            more.
          </Text>
          {features.map((d, index) => (
            <Box
              key={index}
              my={5}
              bg="white"
              p={3}
              borderRadius={7}
              shadow="md"
            >
              <Flex alignItems="center" gap={2}>
                {d.icon}
                <Text fontSize="xl" as="b">
                  {d.heading}
                </Text>
              </Flex>
              <Text fontSize="sm" ml={1} mt={2} color="gray.700">
                {d.description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
