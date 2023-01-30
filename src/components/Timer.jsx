import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Tasks from "./Tasks";

const Timer = () => {
  const [time, setTime] = useState("25:00");

  const handleClick = (timerType) => {
    if (timerType == "short") {
      setTime("05:00");
    } else if (timerType == "long") {
      setTime("15:00");
    } else {
      setTime("25:00");
    }
  };

  return (
    <>
      <Box bg="gray.100" borderRadius="6px" pt={5} pb={5} mt={10}>
        <Center>
          <Flex>
            <ButtonGroup>
              <Button colorScheme="orange" onClick={() => handleClick("work")}>
                Work
              </Button>
              <Button onClick={() => handleClick("short")}>Short Break</Button>
              <Button onClick={() => handleClick("long")}>Long Break</Button>
            </ButtonGroup>
          </Flex>
        </Center>
        <Box>
          <Center mb={5} mt={5}>
            <Heading size="4xl" color="gray.800">
              {time}
            </Heading>
          </Center>
          <Center>
            <Button size="lg" bg="gray.300">
              START
            </Button>
          </Center>
        </Box>
      </Box>
      <Tasks />
    </>
  );
};

export default Timer;
