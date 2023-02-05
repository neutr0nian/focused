import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Music, Navbar, Timer } from '../components'

const Homepage = () => {
  return (
    <>
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
    </>
  )
}

export default Homepage