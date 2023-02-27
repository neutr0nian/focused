import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box p={4} bg={"black"} position="absolute" bottom={0} w="full" h={14}>
      <Flex color="white">
        <Text as="b">focused</Text>
        <Spacer />
        <Text fontSize="sm">Made with ❤️ by neutronian</Text>
        <Spacer />
        <Flex gap={2} fontSize="sm">
          <Text>Github</Text>
          <Text>LinkedIn</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
