/* eslint-disable import/no-duplicates */
import React from 'react';
import type { RangeKeyDict, Range } from 'react-date-range';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

import {
  Box,
  Container,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import { startOfToday, endOfToday, getTime, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import type { CycleApiData } from '~/@types/cycles';
import { Calendar } from '~/components/Calendar';
import { Head } from '~/components/Head';
import { useCyclesContext } from '~/hooks/useCyclesContext';

import { Cycles } from './Cycles';

export const ReportsPage = () => {
  const [interval, setInterval] = React.useState('');

  const [date, setDate] = React.useState<Range[]>([
    {
      startDate: startOfToday(),
      endDate: endOfToday(),
      key: 'selection',
    },
  ]);

  const { cyclesData } = useCyclesContext();

  const handleOnChange = React.useCallback((rangesByKey: RangeKeyDict) => {
    const { selection } = rangesByKey;

    setDate([selection]);
  }, []);

  const filterCycleByDate = React.useCallback(
    (cycle: CycleApiData) => {
      const startDate = date[0]?.startDate
        ? getTime(new Date(date[0]?.startDate))
        : getTime(startOfToday());

      const endDate = date[0]?.endDate
        ? getTime(new Date(date[0]?.endDate))
        : getTime(endOfToday());

      return cycle.startDate >= startDate && cycle.startDate <= endDate;
    },
    [date],
  );

  const cyclesByDate = React.useMemo(() => {
    return cyclesData?.filter((cycle) => filterCycleByDate(cycle));
  }, [filterCycleByDate, cyclesData]);

  React.useEffect(() => {
    if (date[0]?.startDate && date[0]?.endDate) {
      const start = format(date[0]?.startDate, 'dd MMMM yyyy', {
        locale: pt,
      });

      const end = format(date[0]?.endDate, 'dd MMMM yyyy', {
        locale: pt,
      });

      setInterval(`${start} - ${end}`);
    }
  }, [date]);

  return (
    <>
      <Head title="Meus Apontamentos" />

      <Container maxW="1312px" centerContent>
        <Box w="100%" my="10">
          <Heading size="lg" textAlign="center" fontWeight="bold" color="black">
            Meus Apontamentos
          </Heading>

          <Accordion defaultIndex={[0]} allowToggle mt="5">
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    _hover={{
                      bg: 'transparent',
                    }}
                    cursor="default"
                    justifyContent="flex-end"
                    px="0"
                  >
                    {isExpanded ? (
                      <MdClose size={24} cursor="pointer" />
                    ) : (
                      <FiMenu size={24} cursor="pointer" />
                    )}
                  </AccordionButton>

                  <AccordionPanel
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    px="0"
                  >
                    <Calendar ranges={date} onChange={handleOnChange} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>

          <Text
            align="center"
            fontWeight="semibold"
            fontSize="large"
            color="black"
            mt="6"
          >
            {interval}
          </Text>

          <Cycles cyclesData={cyclesByDate} />
        </Box>
      </Container>
    </>
  );
};
