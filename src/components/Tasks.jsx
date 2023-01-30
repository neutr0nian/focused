import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Spacer,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      name: "Write an article",
      note: "Medium post at 4:00 pm",
    },
    {
      name: "Read a book",
      note: "Think like monk",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [inputs, setInputs] = useState({ name: "", note: "" });

  const handleAddTasks = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <Box mt={4}>
      <Flex alignItems="baseline" mb={2}>
        <Heading size="md">Tasks</Heading>
        <Spacer />
        <Button>clear</Button>
      </Flex>
      <Divider />
      <VStack align="stretch">
        {tasks.length &&
          tasks.map((task) => (
            <Box p={3} bg="gray.200" borderRadius={7}>
              <Text ml={2} size="md">
                {task.name}
              </Text>
              {task.note && (
                <>
                  <Text p={2}>Notes: {task.note}</Text>
                </>
              )}
            </Box>
          ))}

        {showForm && (
          <Box bg="gray.100" border="1px gray" mb={2} borderRadius={7} p={4}>
            <VStack align="stretch">
              <Input
                placeholder="What are you working on?"
                bg="white"
                onChange={() => setInputs()}
              ></Input>
              <Textarea placeholder="Add note" bg="white"></Textarea>
              <Flex>
                <Button bg="teal.400" color="white">
                  Add
                </Button>
                <Spacer />
                <Button
                  bg="red.400"
                  color="white"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </Flex>
            </VStack>
          </Box>
        )}
        {!showForm && (
          <Button onClick={() => setShowForm(!showForm)}>Add Task</Button>
        )}
      </VStack>
    </Box>
  );
};

export default Tasks;
