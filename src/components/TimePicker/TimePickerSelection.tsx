import React from 'react';

import { Flex, Box } from '@chakra-ui/react';

import { ControlTime } from './ControlTime';
import { HourFormat } from './HourFormat';

type Props = {
  start: number;
  end: number;
  value: string;
  setValue: (value: string) => void;
  notShowExclude?: boolean;
  exclude?: number[];
};

export const TimePickerSelection = ({
  start,
  end,
  value,
  setValue,
  notShowExclude,
  exclude,
}: Props) => {
  const [slecetorMove, setSlecetorMove] = React.useState(() => Number(value));

  const formattedValue = slecetorMove?.toString().padStart(2, '0');

  const controlTop = React.useCallback(() => {
    let prev = slecetorMove;
    if (prev !== start) {
      if (exclude?.includes(prev - 1)) {
        while (exclude?.includes(prev - 1)) {
          if (prev - 2 < start) {
            return setSlecetorMove(end);
          }
          prev = prev - 1;
          setSlecetorMove(prev - 1);
        }
      } else {
        return setSlecetorMove(prev - 1);
      }
    } else {
      let endnumber = end;
      if (exclude?.includes(end)) {
        while (exclude?.includes(endnumber - 1)) {
          endnumber = endnumber - 1;
          setSlecetorMove(endnumber - 1);
        }
      } else {
        return setSlecetorMove(end);
      }
    }
  }, [exclude, end, slecetorMove, start]);

  const controlBottom = React.useCallback(() => {
    let prev = slecetorMove;
    if (prev !== end) {
      if (exclude?.includes(prev + 1)) {
        while (exclude?.includes(prev + 1)) {
          if (prev + 2 > end) {
            return setSlecetorMove(start);
          }
          prev = prev + 1;
          setSlecetorMove(prev + 1);
        }
      } else {
        return setSlecetorMove(prev + 1);
      }
    } else {
      return setSlecetorMove(start);
    }
  }, [exclude, end, slecetorMove, start]);

  React.useEffect(() => {
    let prev = slecetorMove;

    if (exclude?.includes(prev)) {
      while (exclude?.includes(prev)) {
        prev = prev + 1;
        setSlecetorMove(prev);
      }
    }
  }, [exclude, slecetorMove]);

  React.useEffect(() => {
    setValue(formattedValue);
  }, [formattedValue, setValue]);

  return (
    <Flex direction="column" align="center">
      <ControlTime control="top" onClick={controlTop} />

      <Flex
        direction="column"
        align="center"
        position="relative"
        overflow="hidden"
        userSelect="none"
        h="32"
        w="16"
      >
        <Box
          position="absolute"
          top="10"
          borderRadius="md"
          w="100%"
          h="10"
          bg="orange.500"
        />

        <HourFormat
          start={start}
          end={end}
          slecetorMove={slecetorMove}
          notShowExclude={notShowExclude}
          exclude={exclude}
        />
      </Flex>

      <ControlTime control="bottom" onClick={controlBottom} />
    </Flex>
  );
};
