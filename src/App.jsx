import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { Navbar, Timer, Tasks } from "./components";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Container maxW={600} mt={4}>
        <Navbar />
        <Timer />
      </Container>
      <Box mt={4}>
        <SimpleGrid columns={2} spacing={10}>
          <Box bg="tomato" height="80px">
            Music
          </Box>
          <Box bg="purple" height="80px">
            Notes and stuff
          </Box>
        </SimpleGrid>
      </Box>
    </div>
  );
}

export default App;
