import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Task = ({id, title, body, onDragStart}) => {
  return (
    <Box bg='gray.200' p={3} borderRadius={6} draggable onDragStart={(e) => onDragStart(e, id)}>
      <Text as='b' fontSize='md'>{title}</Text>
      <Text fontSize='md'>{body}</Text>
      </Box>
  )
}

export default Task