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

import { TimePicker } from '~/components/TimePicker';
import { formatDateWithoutHours, formatHour } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';

export const Cycle = () => {
  const bg = useColorModeValue('gray.50', 'gray.200');

  const { id } = useParams<string>();
  const { cyclesData } = useCyclesContext();
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

  if (!cycle) return <></>;

  return (
    <Box as="form" px="10">
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
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};
