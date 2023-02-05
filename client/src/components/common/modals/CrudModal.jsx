import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'

const SimpleModal = ({title, body, isOpen, onClose, handleSubmit}) => {
  return (
     <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            {body}
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default SimpleModal