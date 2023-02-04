import { Center, Text } from '@chakra-ui/react'
import React from 'react'
import TaskCard from './TaskCard'

const CompletedTasks = ({tasks}) => {
  return (
    <>
    {
        tasks.length ? (
            
                tasks.map((task) => (
                    <TaskCard task={task} type='completed' />
                ))
            
        ) : (
            <Center p={4}>
                <Text fontSize='lg'>No completed tasks</Text>
            </Center>
        )
    }
    </>
  )
}

export default CompletedTasks