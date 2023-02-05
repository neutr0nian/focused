import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'
import ProjectTable from '../components/projects/ProjectTable'

const Projects = () => {
  return (
    <Box>
    <Navbar />
    <Box p={4}>
      <Flex p={2}>
      <Text as='b' fontSize='lg'>Projects</Text>
    <Spacer />
    <Button leftIcon={<AddIcon />}>New</Button>
      </Flex>
      <ProjectTable />
    </Box>
    </Box>
  )
}

export default Projects