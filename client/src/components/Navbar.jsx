import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Reports from "./Reports";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        marginX={2}
        marginY={2}
      >
        <Box p="2">
          <Link to="/">
            <Heading size="md">Focused</Heading>
          </Link>
        </Box>
        <Spacer />
        <HStack spacing="20px">
          <Reports isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          <Link to="/projects">
            <Text colorScheme="teal">Projects</Text>
          </Link>
          <Text size="sm" colorScheme="teal">
            Settings
          </Text>
          <Link to="/access">
            <Button size="sm" colorScheme="teal">
              Log in
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Divider size="xl" colorScheme="purple" />
    </div>
  );
};

export default Navbar;
