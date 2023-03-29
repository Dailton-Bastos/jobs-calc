import { RiFilterFill } from 'react-icons/ri';

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';

import { Calendar } from '~/components/Calendar';
import { Head } from '~/components/Head';
import { Sidebar } from '~/components/Sidebar';

// import { ListJobs } from './ListJobs';

export const ReportsPage = () => {
  return (
    <>
      <Head title="Meus Apontamentos" />

      <Box as="section" w="100%">
        <Grid
          templateAreas={`"sidebar main"
        "sidebar main"`}
          gridTemplateColumns={'200px 1fr'}
        >
          <GridItem area={'sidebar'}>
            <Box position="fixed" h="100%">
              <Sidebar />
            </Box>
          </GridItem>

          <GridItem area={'main'}>
            <Container as="main" maxW="1440px" centerContent px="16">
              <Container maxW="1120px" centerContent>
                <Box w="100%" my="10">
                  <Heading size="md" textAlign="center">
                    Meus Apontamentos
                  </Heading>

                  <Accordion allowToggle mt="5">
                    <AccordionItem borderTop="none">
                      <AccordionButton
                        _hover={{
                          bg: 'transparent',
                        }}
                        cursor="default"
                      >
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="lg"
                          fontWeight="bold"
                        >
                          Filtrar
                        </Box>
                        <RiFilterFill
                          size={22}
                          color="#F1972C"
                          cursor="pointer"
                        />
                      </AccordionButton>

                      <AccordionPanel
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Calendar />
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  {/* <ListJobs /> */}
                </Box>
              </Container>
            </Container>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
