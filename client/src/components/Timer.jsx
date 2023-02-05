import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { dispSecondsAsMins } from "../utils/DisplayTime";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import DisplayTasks from "./Tasks/DisplayTasks";

const minsFocused = [];
let startTime = 0;

const Timer = () => {
  const [timer, setTimer] = useState(1500);
  const [timerType, setTimerType] = useState("work");

  const [start, setStart] = useState(false);
  const tick = useRef();

  useEffect(() => {
    if (start) {
      startTime = timer;
      tick.current = setInterval(() => {
        if (timer > 0) setTimer((timer) => timer - 1);
        else clearInterval(tick.current);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  useEffect(() => {
    if (timer === 0) {
      setStart(false);
      storeProgess(startTime / 60);
      setTimeout(() => {
        handleClick(timerType);
      }, 3000);
      clearInterval(tick.current);
    }
  }, [timer]);

  const storeProgess = (time) => {
    if (timerType === "work") {
      minsFocused.push(time);
      localStorage.removeItem("minsFocused");
      localStorage.setItem("minsFocused", minsFocused);
    }
  };

  const handleClick = (timerType) => {
    setTimerType(timerType);
    if (timerType == "short") {
      setTimer(300);
    } else if (timerType == "long") {
      setTimer(900);
    } else {
      setTimer(1500);
    }
  };

  return (
    <>
      <Box bg="gray.100" borderRadius="6px" pt={5} pb={5} mt={10}>
        <Center>
          <Flex>
            <ButtonGroup>
              <Button
                colorScheme={timerType === "work" ? "orange" : "gray"}
                onClick={() => handleClick("work")}
              >
                Focus
              </Button>
              <Button
                colorScheme={timerType === "short" ? "blue" : "gray"}
                onClick={() => handleClick("short")}
              >
                Short Break
              </Button>
              <Button
                colorScheme={timerType === "long" ? "green" : "gray"}
                onClick={() => handleClick("long")}
              >
                Long Break
              </Button>
            </ButtonGroup>
          </Flex>
        </Center>
        <VStack marginY={4}>
          <HStack alignItems="center">
            <Tooltip hasArrow label="Reduce time">
              <IconButton
                isDisabled={timer <= 1}
                icon={<MinusIcon />}
                onClick={() => setTimer(timer - 60)}
              />
            </Tooltip>
            <Text fontSize="8xl" as="b" color="gray.700">
              {dispSecondsAsMins(timer)}
            </Text>
            <Tooltip hasArrow label="Add time">
              <IconButton
                icon={<AddIcon />}
                onClick={() => setTimer(timer + 60)}
              />
            </Tooltip>
          </HStack>
          <Button
            size="lg"
            bg="gray.300"
            onClick={() => setStart(!start)}
            borderBottom="4px solid orange"
          >
            {start ? "STOP" : "START"}
          </Button>
        </VStack>
      </Box>
      <DisplayTasks />
    </>
  );
};

export default Timer;
