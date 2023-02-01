import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <Flex minWidth="max-content" alignItems="center" gap="2" mb={2}>
        <Box p="2">
          <Heading size="md">Focused</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button size="sm" colorScheme="teal">
            Report
          </Button>
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
