import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Tasks from "./Tasks";

const Timer = () => {
  const [timer, setTimer] = useState(1500);
  const [start, setStart] = useState(false);
  const tick = useRef();

  useEffect(() => {
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

    const handleClick = (timerType) => {
    if (timerType == "short") {
      setTimer(300);
    } else if (timerType == "long") {
      setTimer(900);
    } else {
      setTimer(1500);
    }
  };

   const dispSecondsAsMins = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
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
            <Text fontSize="8xl" as="b" color="gray.700">
              {dispSecondsAsMins(timer)}
            </Text>
          </Center>
          <Center>
            <Button size="lg" bg="gray.300" onClick={()=>setStart(!start)}>
              { start ? 'STOP' : 'START'}
            </Button>
          </Center>
        </Box>
      </Box>
      <Tasks />
    </>
  );
};

export default Timer;
