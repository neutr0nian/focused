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
} from "@chakra-ui/react";
import React from "react";

const SimpleModal = ({ title, body, isOpen, onClose, size }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SimpleModal;
