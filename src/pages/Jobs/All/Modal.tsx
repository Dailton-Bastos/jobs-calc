import { RiAlertLine } from 'react-icons/ri';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  UseModalProps,
  Button,
  Flex,
} from '@chakra-ui/react';

export const ModalDelete = ({ onClose, isOpen }: UseModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent="center" alignItems="center">
            <RiAlertLine size={50} color="#F6E05E" />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          Tem certeza que deseja continuar? Essa ação não poderá ser desfeita!
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>

          <Button colorScheme="red" onClick={onClose}>
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
