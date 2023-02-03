import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'
import BarChart from './Charts/BarChart';

const Reports = ({isOpen, onOpen, onClose}) => {
//   const { isOpen, onOpen, onClose } = useDisclosure()
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
  return (
    <>
      <Button size='sm' colorScheme='teal' onClick={onOpen}>Report</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Daily Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <BarChart data={data} />
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