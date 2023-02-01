import {
  Box,
  Center,
  SimpleGrid,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import MusicCard from "./MusicCard";

const Music = () => {
  const playlist = [];
  return (
    <Box>
      <Text fontSize="xl" as="b">
        Music
      </Text>
      <Grid
        h="auto"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={1} bg="tomato" />
        <GridItem colSpan={1} bg="tomato" />
        <GridItem colSpan={1} bg="tomato" />

        <GridItem rowSpan={3} colSpan={2}>
          <MusicCard />
        </GridItem>
        <GridItem colSpan={1} bg="tomato" />
        <GridItem colSpan={1} bg="tomato" />
        <GridItem colSpan={1} bg="tomato" />
      </Grid>
    </Box>
  );
};

export default Music;
