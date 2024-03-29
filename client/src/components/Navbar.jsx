import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "react-feather";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  console.log("is logged in:", isLoggedIn);
  function logout() {
    localStorage.removeItem("token");
    navigate(0);
    navigate("/");
  }

  return (
    <Box bg="#F1F0EA">
      <Flex minWidth="max-content" alignItems="center" gap="2" padding={2}>
        <Box p="2">
          <Link to="/">
            <Heading size="md">focused</Heading>
          </Link>
        </Box>
        <Spacer />
        <HStack spacing="20px">
          {!isLoggedIn ? (
            <Link to="/access">
              <Button size="sm" colorScheme="teal">
                Log in
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/projects">
                <Text colorScheme="teal">Projects</Text>
              </Link>
              <Link to="/reports">
                <Text colorScheme="teal">Stats</Text>
              </Link>
              <Menu>
                <MenuButton
                  size="sm"
                  as={IconButton}
                  bg="none"
                  borderRadius="full"
                  icon={<User />}
                >
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </HStack>
      </Flex>
      <Divider size="xl" colorScheme="purple" />
    </Box>
  );
};

export default Navbar;
