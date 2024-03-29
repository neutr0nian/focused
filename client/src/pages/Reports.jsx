import {
  Alert,
  AlertIcon,
  Box,
  Container,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProjects } from "../components/projects/projectSlice";
import Statistics from "../components/StatContainer/Statistics";
import { selectAllTasks } from "../components/tasks/taskSlice";
import { useGetTasksQuery } from "../services/tasksApi";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Reports = () => {
  const today = new Date();
  const target = today.getDate() - 6;

  const token = localStorage.getItem("token");
  const { data: tasks, isLoading, isSuccess } = useGetTasksQuery(token);
  const projects = useSelector(selectAllProjects);

  const [tasksStats, setTasksStats] = useState({
    data: {},
    isLoading: true,
  });

  const [projectsStats, setProjectsStats] = useState({
    data: {},
    isLoading: true,
  });

  const [barData, setBarData] = useState({});
  function loadTasksStats() {
    const stat = {
      total: 0,
      pending: 0,
      completed: 0,
      individual: 0,
      shared: 0,
    };

    const temp = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    tasks.data.map((task) => {
      stat.total += 1;
      if (task.status === "pending" || task.status === "ongoing")
        stat.pending += 1;
      else {
        stat.completed += 1;
        let compDate = new Date(task.edited).getDate();
        if (compDate >= target && compDate <= today) {
          let day = days[new Date(task.edited).getDay()];
          temp[day] += 1;
        }
      }

      if (task.projectId) stat.shared += 1;
      else stat.individual += 1;
    });

    console.log(temp);
    setTasksStats({
      data: stat,
      isLoading: false,
    });

    setBarData(temp);
  }

  function loadProjectsStats() {
    const stat = {
      total: 0,
      pending: 0,
      completed: 0,
      individual: 0,
      shared: 0,
    };

    projects.map((project) => {
      stat.total += 1;
      if (project.status === "ongoing") stat.pending += 1;
      else stat.completed += 1;

      if (project.userEmails.length) stat.shared += 1;
      else stat.individual += 1;
    });

    setProjectsStats({
      data: stat,
      isLoading: false,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      loadTasksStats();
    }
    loadProjectsStats();
  }, [isSuccess]);

  return (
    <Container maxW="3xl">
      <Box my={4}>
        <Text fontSize="3xl" as="b">
          Statistics
        </Text>
        <Text color="gray.600" fontSize="md">
          Your tasks and projects statistics summary as of today
        </Text>
      </Box>
      {isLoading ? (
        <Stack alignItems="center">
          <Spinner mt={8} />
          <Text>Reports are loading...</Text>
        </Stack>
      ) : (
        <>
          {isSuccess ? (
            <>
              <Statistics
                heading="Tasks"
                data={tasksStats.data}
                labels={days}
                barData={barData}
              />
              <Alert status="info" borderRadius={5}>
                <AlertIcon />
                The project chart is still in work, our team will soon release
                the feature.
              </Alert>
              <Statistics
                heading="Projects"
                data={projectsStats.data}
                labels={days}
                barData={barData}
              />
            </>
          ) : (
            "Please login to see the reports"
          )}
        </>
      )}
    </Container>
  );
};

export default Reports;
