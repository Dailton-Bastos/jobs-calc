import React from 'react';

import {
  Box,
  Flex,
  VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import { Container } from '~/components/Container';
import { Head } from '~/components/Head';
import { Title } from '~/components/Title';
// import { useCyclesContext } from '~/hooks/useCyclesContext';

export const EditJobReports = () => {
  // const { cycles } = useCyclesContext();

  return (
    <>
      <Head title="Editar Apontamentos" />

      <Container title="Editar Apontamentos" to="/jobs">
        <Box as="section" bg="white" px="8" py="12" borderRadius="5px">
          <Box>
            <Title title="Job Apontamentos" />

            <TableContainer mt="10">
              <Table colorScheme="blackAlpha">
                <TableCaption>
                  <Flex gap="2" align="center" justify="flex-end">
                    <Text fontWeight="bold">Total de horas:</Text>
                    <Text>10</Text>
                  </Flex>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Data</Th>
                    <Th>Início</Th>
                    <Th>Fim</Th>
                    <Th>Ação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr bg="gray.200" opacity="0.5">
                    <Td>08/05/2023</Td>

                    <Td>
                      <VStack spacing="2" align="flex-start">
                        <Text>
                          <Text as="time">11:50</Text>
                        </Text>
                      </VStack>
                    </Td>

                    <Td>
                      <VStack spacing="2" align="flex-start">
                        <Text>11:50</Text>
                      </VStack>
                    </Td>

                    <Td>120hr</Td>
                  </Tr>

                  <Tr>
                    <Td>05/05/2023</Td>

                    <Td>
                      <VStack spacing="2" align="flex-start">
                        <Text>
                          <Text as="time">09:00</Text>
                        </Text>
                      </VStack>
                    </Td>

                    <Td>
                      <VStack spacing="2" align="flex-start">
                        <Text>09:15</Text>
                      </VStack>
                    </Td>

                    <Td>120hr</Td>
                  </Tr>
                  <Tr>
                    <Td>03/05/2023</Td>

                    <Td>
                      <VStack spacing="2" align="flex-start">
                        <Text>
                          <Text as="time">13:30</Text>
                        </Text>
                      </VStack>
                    </Td>

                    <Td>
                      <VStack spacing="2" align="flex-start">
                        <Text>17:25</Text>
                      </VStack>
                    </Td>

                    <Td>120hr</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
};
