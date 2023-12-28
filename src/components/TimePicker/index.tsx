import React from 'react';
import { CiClock1 } from 'react-icons/ci';

import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  useColorModeValue,
} from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';

import { useLockedBodyScroll } from '~/hooks/useLockedBodyScroll';

import { HourWheel } from './HourWheel';
import { MinuteWheel } from './MinuteWheel';

type Props = InputProps & {
  hour: string;
  minute: string;
  startDate: number | undefined;
  handleChangeHour: (value: string) => void;
  handleChangeMinute: (value: string) => void;
};

export const TimePicker = React.forwardRef<HTMLInputElement, Props>(
  (
    { hour, minute, startDate, handleChangeHour, handleChangeMinute, ...props },
    ref,
  ) => {
    const bg = useColorModeValue('gray.50', 'gray.200');

    const { setLocked } = useLockedBodyScroll();

    return (
      <Popover
        closeOnBlur={false}
        autoFocus={false}
        onClose={() => setLocked(false)}
        onOpen={() => setLocked(true)}
      >
        <PopoverTrigger>
          <InputGroup>
            <Input
              bg={bg}
              color="black"
              focusBorderColor="orange.500"
              {...props}
              ref={ref}
            />

            <InputRightElement>
              <CiClock1 size={22} />
            </InputRightElement>
          </InputGroup>
        </PopoverTrigger>

        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Flex align="center" justify="center" gap="2">
                <HourWheel
                  hour={hour}
                  setHour={handleChangeHour}
                  startDate={startDate}
                />
                <Box h="10" fontSize="xl">
                  :
                </Box>
                <MinuteWheel
                  minute={minute}
                  setMinute={handleChangeMinute}
                  startDate={startDate}
                  hour={hour}
                />
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    );
  },
);

TimePicker.displayName = 'TimePicker';
