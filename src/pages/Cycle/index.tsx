import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Grid,
  GridItem,
  VStack,
  ButtonGroup,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { setHours, setMinutes } from 'date-fns';
import { ref, set } from 'firebase/database';

import { TimePicker } from '~/components/TimePicker';
import { db } from '~/config/firebase';
import { formatDateWithoutHours, formatHour } from '~/helpers/utils';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useCyclesContext } from '~/hooks/useCyclesContext';

export const Cycle = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const bg = useColorModeValue('gray.50', 'gray.200');
  const { customToast } = useCustomToast();

  const { id } = useParams<string>();
  const { cyclesData, updateCycle } = useCyclesContext();
  const navigate = useNavigate();

  const cycle = cyclesData?.find((item) => item?.id === id);

  const [description, setDescription] = React.useState(() => {
    return cycle?.description;
  });

  const [hour, setHour] = React.useState(() => {
    return cycle?.fineshedDate
      ? formatHour(cycle?.fineshedDate).split(':')[0]
      : '00';
  });

  const [minute, setMinute] = React.useState(() => {
    return cycle?.fineshedDate
      ? formatHour(cycle?.fineshedDate).split(':')[1]
      : '00';
  });

  const currentFinishedHours = cycle?.fineshedDate ?? 0;

  const newHour = setHours(new Date(currentFinishedHours), Number(hour));
  const newFinishedHours = setMinutes(
    new Date(newHour),
    Number(minute),
  ).getTime();

  const date = cycle?.startDate
    ? formatDateWithoutHours(cycle?.startDate)
    : '--/--/---';

  const startHour = cycle?.startDate ? formatHour(cycle?.startDate) : '';

  const handleChangeHour = React.useCallback((value: string) => {
    setHour(value);
  }, []);

  const handleChangeMinute = React.useCallback((value: string) => {
    setMinute(value);
  }, []);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!cycle) return;

      try {
        setIsLoading(true);

        await set(ref(db, `cycles/${cycle.id}`), {
          ...cycle,
          description,
          fineshedDate: newFinishedHours,
        });

        updateCycle({
          ...cycle,
          description,
          fineshedDate: newFinishedHours,
        });

        customToast({
          title: 'Apontamento Atualizado',
          description: 'Informações salvas com sucesso.',
          status: 'success',
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        customToast({
          title: 'Ocorreu um erro',
          description: 'Tente novamente, por favor.',
          status: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [updateCycle, cycle, description, newFinishedHours, customToast],
  );

  if (!cycle) return <></>;

  return (
    <form onSubmit={handleSubmit}>
      <Box px="10">
        <VStack spacing={6} align="flex-start">
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
            <GridItem w="100%">
              <FormControl>
                <FormLabel>Data</FormLabel>

                <Input
                  bg={bg}
                  color="black"
                  focusBorderColor="orange.500"
                  cursor="not-allowed"
                  defaultValue={date}
                  readOnly
                />
              </FormControl>
            </GridItem>

            <GridItem w="100%">
              <FormControl>
                <FormLabel>Início</FormLabel>

                <Input
                  bg={bg}
                  color="black"
                  focusBorderColor="orange.500"
                  cursor="not-allowed"
                  defaultValue={startHour}
                  readOnly
                />
              </FormControl>
            </GridItem>

            <GridItem w="100%">
              <FormControl>
                <FormLabel>Fim</FormLabel>

                <TimePicker
                  placeholder="00:00"
                  isReadOnly
                  value={`${hour}:${minute}`}
                  hour={hour}
                  minute={minute}
                  startDate={cycle?.startDate}
                  handleChangeHour={handleChangeHour}
                  handleChangeMinute={handleChangeMinute}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl>
            <FormLabel>Descrição</FormLabel>

            <Textarea
              value={description}
              bg={bg}
              color="black"
              focusBorderColor="orange.500"
              height="48"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <ButtonGroup variant="outline" spacing="6">
            <Button
              type="submit"
              color="white"
              bg="#36B236"
              _hover={{
                bg: '#3CC73C',
              }}
              w="100%"
              fontSize="lg"
              boxShadow="md"
              isLoading={isLoading}
            >
              Salvar
            </Button>

            <Button
              color="white"
              bg="#EB3B35"
              w="100%"
              fontSize="lg"
              boxShadow="md"
              _hover={{
                bg: '#FA3F38',
              }}
              disabled={isLoading}
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </ButtonGroup>
        </VStack>
      </Box>
    </form>
  );
};
