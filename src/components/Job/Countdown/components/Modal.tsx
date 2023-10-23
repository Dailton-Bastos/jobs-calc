import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Switch,
  Flex,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleFinishCurrentCycle: () => void;
  isChecked: boolean;
  onChangeChecked: () => void;
  cycleDescription: string;
  changeCycleDescription: (value: string) => void;
  isLoading: boolean;
};

export const Modal = ({
  isOpen,
  onClose,
  isChecked,
  handleFinishCurrentCycle,
  onChangeChecked,
  cycleDescription,
  changeCycleDescription,
  isLoading,
}: Props) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Salvar Apontamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Descrição:</FormLabel>

            <Textarea
              value={cycleDescription}
              onChange={(e) => changeCycleDescription(e.target.value)}
              focusBorderColor="orange.400"
              size="lg"
            />

            <Flex align="center" mt={4}>
              <Switch
                id="highlight"
                colorScheme="orange"
                isChecked={isChecked}
                onChange={onChangeChecked}
              />

              <FormLabel htmlFor="highlight" m="0" ml="2">
                Concluir Job
              </FormLabel>
            </Flex>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={handleFinishCurrentCycle}
            w="100%"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Salvar
          </Button>

          <Button
            colorScheme="red"
            onClick={onClose}
            w="100%"
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
