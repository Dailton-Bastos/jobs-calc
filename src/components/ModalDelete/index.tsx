import { RiAlertLine } from 'react-icons/ri';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import type { UseModalProps } from '@chakra-ui/react';

type Props = UseModalProps & {
  title?: string;
  onConfirm: () => void;
  isLoading?: boolean;
};

export const ModalDelete = ({
  title,
  onClose,
  onConfirm,
  isLoading,
  ...props
}: Props) => {
  return (
    <Modal onClose={onClose} {...props} isCentered>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader>
          <Flex justifyContent="center" alignItems="center">
            <RiAlertLine size={50} color="#EB3B35" />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Text color="black" fontSize="lg">
            {title}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            mr={3}
            color="white"
            bg="#EB3B35"
            w="100%"
            fontWeight="bold"
            _hover={{
              bg: '#FA3F38',
            }}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Confirmar
          </Button>

          <Button
            type="button"
            variant="outline"
            color="black"
            bg="gray.100"
            w="100%"
            fontWeight="bold"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
