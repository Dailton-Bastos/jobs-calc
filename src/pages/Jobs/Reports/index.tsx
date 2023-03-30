import React from 'react';
import { RangeKeyDict, Range } from 'react-date-range';
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
import { getTime, startOfToday, endOfToday } from 'date-fns';

import { FilteredCycles } from '~/@types/cycles';
import { Calendar } from '~/components/Calendar';
import { Head } from '~/components/Head';
import { Sidebar } from '~/components/Sidebar';
import { useCyclesContext } from '~/hooks/useCyclesContext';

import { Cycles } from './Cycles';

export const ReportsPage = () => {
  const [cyclesData, setCyclesData] = React.useState<FilteredCycles[]>([]);

  const [date, setDate] = React.useState<Range[]>([
    {
      startDate: startOfToday(),
      endDate: endOfToday(),
      key: 'selection',
    },
  ]);

  const { cycles } = useCyclesContext();

  const handleOnChange = React.useCallback((rangesByKey: RangeKeyDict) => {
    const { selection } = rangesByKey;

    setDate([selection]);
  }, []);

  React.useEffect(() => {
    const cyclesFiltered = cycles?.filter((cycle) => {
      const startDate = date[0]?.startDate
        ? getTime(new Date(date[0]?.startDate))
        : getTime(startOfToday());
      const endDate = date[0]?.endDate
        ? getTime(new Date(date[0]?.endDate))
        : getTime(endOfToday());

      return cycle.createdAt >= startDate && cycle.createdAt <= endDate;
    });

    setCyclesData(cyclesFiltered);
  }, [cycles, date]);

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

                  <Accordion defaultIndex={[0]} allowToggle mt="5">
                    <AccordionItem border="none">
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
                        <Calendar ranges={date} onChange={handleOnChange} />
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Cycles cyclesData={cyclesData} />
                </Box>
              </Container>
            </Container>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
