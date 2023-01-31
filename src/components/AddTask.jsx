import {
  Box,
  Input,
  VStack,
  Textarea,
  Spacer,
  Button,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";

const AddTask = ({ editForm, inputs, handleChange, addTask, hideForm }) => {
  console.log(inputs);
  return (
    <Box bg="gray.100" border="1px gray" mb={2} borderRadius={7} p={4}>
      <VStack align="stretch">
        <Input
          placeholder="What are you working on?"
          bg="white"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        ></Input>
        <Textarea
          placeholder="Add note"
          name="note"
          bg="white"
          value={inputs.note}
          onChange={handleChange}
        ></Textarea>
        <Flex>
          <ButtonGroup>
            <Button
              hidden={editForm.value}
              colorScheme="teal"
              color="white"
              onClick={() => addTask(inputs)}
            >
              Add
            </Button>
            <Button
              hidden={!editForm.value}
              colorScheme="teal"
              color="white"
              onClick={() => editForm.handle(inputs)}
            >
              Save
            </Button>
          </ButtonGroup>
          <Spacer />
          <Button
            colorScheme="red"
            color="white"
            onClick={() => {
              editForm.value ? editForm.handle() : hideForm(false);
            }}
          >
            Cancel
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AddTask;
