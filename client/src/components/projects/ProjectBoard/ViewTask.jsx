import { Box, Button, Flex, Input, Spacer, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRef } from 'react';

const ViewTask = ({inputs, onClose, handleChange, handleSubmit}) => {
  const title = useRef(null);

  useEffect(()=>{
    title.current.focus();
  },[])

  return (
    <>
    <Box bg="gray.100" border="1px gray" mb={2} borderRadius={7} p={4}>
      <VStack align="stretch">
        <Input
          placeholder="What are you working on?"
          bg="white"
          name="title"
          ref={title}
          value={inputs.title}
          onChange={handleChange}
          ></Input>
        <Textarea
          placeholder="Add note"
          h={150}
          name="body"
          bg="white"
          value={inputs.body}
          onChange={handleChange}
          ></Textarea>

      </VStack>
    </Box>
    <Flex marginY={3}>

          <Button colorScheme='teal' onClick={()=>{
           onClose()
           handleSubmit(inputs)}
          }>
              Save
            </Button>
            <Spacer />
            <Button colorScheme='gray'  onClick={onClose}>
              Close
            </Button>
    </Flex>
          </>
  )
}

export default ViewTask