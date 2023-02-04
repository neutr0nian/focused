import { useState } from "react";
import "./App.css";

import { Navbar, Timer, Music } from "./components";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Container maxW={600} mt={4}>
        <Navbar />
        <Timer />
      </Container>
      <Box mt={4} m={4}>
        {/* <SimpleGrid columns={2} spacing={10}> */}
          <Box bg="gray.100" height="auto" p={4} borderRadius={7}>
            <Music />
          </Box>
        {/* </SimpleGrid> */}
      </Box>
    </div>
  );
}

export default App;
