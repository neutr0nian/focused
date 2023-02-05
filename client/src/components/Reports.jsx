import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
  Box,
  Text,
  Container,
  Center
} from '@chakra-ui/react'
import { useState } from 'react';
import BarChart from './Charts/BarChart';

const data = [
    {
        label: 'Sun', value: 2,
    },
     {
        label: 'Mon', value: 6,
    },
     {
        label: 'Tue', value: 10,
    },
     {
        label: 'Wed', value: 7,
    },
     {
        label: 'Thu', value: 10,
    },
     {
        label: 'Fri', value: 4,
    },
     {
        label: 'Sat', value: 5,
    },
]
const monthData = [
    {
        label: 'Jan', value: 9,
    },
     {
        label: 'Feb', value: 2,
    },
     {
        label: 'Mar', value: 7,
    },
     {
        label: 'Apr', value: 3,
    },
     {
        label: 'May', value: 4,
    },
     {
        label: 'Jun', value: 9,
    },
     {
        label: 'July', value: 5,
    },
]
const Reports = ({isOpen, onOpen, onClose}) => {
    const isActive = 'orange.400';
    const [reportType, setReportType] = useState('daily');

    const handleReportType = (type) => {
        switch (type) {
            case 'weekly':
                return <BarChart data={data} />
            case 'monthly':
                return <BarChart data={monthData} />
            default:
                return <BarChart data={data} />
        }
    }
  return (
    <>
      <Button size='sm' colorScheme='teal' onClick={onOpen}>Reports</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Reports</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>

            <HStack spacing='24px' align='stretch' cursor='pointer' mb={4} >
                <Box bg='gray.200'  p={5} borderRadius={6} onClick={()=>setReportType('daily')}>
                    <Text>Daily</Text>
                </Box>
                 <Box bg={isActive} p={5} borderRadius={6}  onClick={()=>setReportType('weekly')}>
                    <Text as='b' color='white'>Weekly</Text>
                </Box> 
                <Box bg='gray.200' p={5} borderRadius={6}  onClick={()=>setReportType('monthly')}>
                    <Text>Monthly</Text>
                </Box>
            </HStack>
            </Center>
            {handleReportType(reportType)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} size='md' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default Reports;