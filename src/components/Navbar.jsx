import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Spacer,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import Reports from "./Reports";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Flex minWidth="max-content" alignItems="center" gap="2" mb={2}>
        <Box p="2">
          <Heading size="md">Focused</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Reports isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          <Button size="sm" colorScheme="teal">
            Settings
          </Button>
          <Button size="sm" colorScheme="teal">
            Log in
          </Button>
        </ButtonGroup>
      </Flex>
      <Divider size="xl" colorScheme="purple" />
    </div>
  );
};

export default Navbar;
