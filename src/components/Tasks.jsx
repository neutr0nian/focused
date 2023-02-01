import {
  Box,
  Button,
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
import AddTask from "./AddTask";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      name: "Write an article",
      note: "Medium post at 4:00 pm",
    },
    {
      id: "2",
      name: "Read a book",
      note: "Think like monk",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({
    value: false,
    id: "",
  });

  const [inputs, setInputs] = useState({ id: "", name: "", note: "" });

  const handleClearTasks = () => {
    setTasks([]);
  };

  const handleAddTasks = (task) => {
    setTasks([...tasks, { id: String(tasks.length + 1), ...task }]);
    setInputs({ id: "", name: "", note: "" });
  };

  const handleChange = (e) => {
    if (e.target.name === "name")
      setInputs({ ...inputs, name: e.target.value });
    else {
      setInputs({ ...inputs, note: e.target.value });
    }
  };

  const handleEditForm = (values) => {
    if (values) {
      let updatedTasks = tasks.map((task) => {
        if (task.id == values.id) {
          console.log("found the task", task);
          task.name = values.name;
          task.note = values.note;
        }
        return task;
      });
      setTasks(updatedTasks);
    }

    setEditForm({ value: false, id: "" });
    setInputs({ id: "", name: "", note: "" });
  };
  return (
    <Box mt={4}>
      <Flex alignItems="baseline" mb={2}>
        <Heading size="md">Tasks</Heading>
        <Spacer />
        <Button onClick={() => handleClearTasks()}>clear</Button>
      </Flex>
      <Divider />
      <VStack align="stretch">
        {tasks.length &&
          tasks.map((task) => (
            <>
              {editForm?.id !== task?.id && (
                <Box p={3} bg="gray.200" borderRadius={7} key={task.id}>
                  <Flex>
                    <Box>
                      <Text ml={2} size="md" as="b">
                        {task.name}
                      </Text>
                      {task.note && (
                        <>
                          <Text p={2}>Notes: {task.note}</Text>
                        </>
                      )}
                    </Box>
                    <Spacer />
                    <Button
                      onClick={() => {
                        setInputs(task);
                        setEditForm({ value: true, id: task.id });
                      }}
                    >
                      Edit
                    </Button>
                  </Flex>
                </Box>
              )}
              {editForm.id === task.id && (
                <AddTask
                  editForm={{ ...editForm, handle: handleEditForm }}
                  inputs={inputs}
                  handleChange={handleChange}
                  addTask={handleAddTasks}
                  hideForm={setShowForm}
                />
              )}
            </>
          ))}

        {!editForm.value && showForm && (
          <AddTask
            editForm={false}
            inputs={inputs}
            handleChange={handleChange}
            addTask={handleAddTasks}
            hideForm={setShowForm}
          />
        )}
        {!showForm && !editForm.value && (
          <Button
            h={12}
            colorScheme="teal"
            onClick={() => setShowForm(!showForm)}
          >
            Add Task
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default Tasks;
