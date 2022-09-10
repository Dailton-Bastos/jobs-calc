import {
  Box,
  Flex,
  Grid,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import { Container } from '~/components/Container';
import { InfoJob } from '~/components/Job/Info';
import { Title } from '~/components/Title';

export const DetailsJobPage = () => {
  return (
    <Container title="Detalhes do Job">
      <Box as="section">
        <Flex alignItems="center" justifyContent="space-between" gap="8">
          <Box w="100%" maxW="640px">
            <Title>Descrição</Title>

            <VStack spacing="6" mt="8" align="flex-start">
              <Grid gap="4" templateColumns="repeat(2, 1fr)" w="100%">
                <InfoJob title="ID:">2207</InfoJob>

                <InfoJob title="Título:">[Fibra] - Novo layout</InfoJob>

                <InfoJob title="Tempo Estimado:">02h:00m</InfoJob>

                <InfoJob title="Tempo utilizado:">05h:38m</InfoJob>

                <InfoJob title="Tipo:">Desenvolvimento</InfoJob>

                <InfoJob title="Status:">Em andamento</InfoJob>

                <InfoJob title="Criado em:">08 de Setembro de 2022</InfoJob>

                <InfoJob title="Última atualização:">08/09/2022</InfoJob>
              </Grid>

              <Box>
                <Text fontWeight="bold">Briefing:</Text>

                <Text fontSize="md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita eos alias vero quod. Nam modi eveniet officiis, id
                  enim, numquam, nostrum rerum quasi neque vitae consectetur
                  nobis? Unde, et necessitatibus.
                </Text>
              </Box>
            </VStack>
          </Box>

          <Box>Estimate</Box>
        </Flex>

        <TableContainer mt="10">
          <Table>
            <TableCaption>
              <Flex gap="2" align="center" justify="flex-end">
                <Text fontWeight="bold">Total de horas:</Text>
                <Text>07h:30m</Text>
              </Flex>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Intervalo</Th>
                <Th>Horas</Th>
                <Th>Total Hora</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>09 setembro 2022</Td>

                <Td>
                  <VStack spacing="2" align="flex-start">
                    <Text>09:00 - 12:20</Text>
                    <Text>15:25 - 16:30</Text>
                  </VStack>
                </Td>

                <Td>
                  <VStack spacing="2" align="flex-start">
                    <Text>3h:20m</Text>
                    <Text>1h:55m</Text>
                  </VStack>
                </Td>

                <Td>5h:15m</Td>
              </Tr>

              <Tr>
                <Td>12 setembro 2022</Td>

                <Td>
                  <VStack spacing="2" align="flex-start">
                    <Text>10:45 - 11:30</Text>
                    <Text>11:30 - 12:00</Text>
                  </VStack>
                </Td>

                <Td>
                  <VStack spacing="2" align="flex-start">
                    <Text>1h:20m</Text>
                    <Text>0h:55m</Text>
                  </VStack>
                </Td>

                <Td>2h:15m</Td>
              </Tr>

              <Tr>
                <Td>12 setembro 2022</Td>

                <Td>
                  <VStack spacing="2" align="flex-start">
                    <Text>10:45 - 11:30</Text>
                    <Text>11:30 - 12:00</Text>
                  </VStack>
                </Td>

                <Td>
                  <VStack spacing="2" align="flex-start">
                    <Text>1h:20m</Text>
                    <Text>0h:55m</Text>
                  </VStack>
                </Td>

                <Td>2h:15m</Td>
              </Tr>

              <Tr>
                <Td>09 setembro 2022</Td>

                <Td>
                  <VStack spacing="2" align="flex-start">
                    <Text>09:00 - 12:20</Text>
                    <Text>15:25 - 16:30</Text>
                  </VStack>
                </Td>

                <Td>
                  <VStack spacing="2" align="flex-start">
                    <Text>3h:20m</Text>
                    <Text>1h:55m</Text>
                  </VStack>
                </Td>

                <Td>5h:15m</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
