import React from 'react';

import { Tooltip, Text } from '@chakra-ui/react';

interface Props {
  children: string;
  label: string;
  dateTime: string;
}

export const JobTime = ({ children, label, dateTime }: Props) => {
  return (
    <Tooltip label={label} placement="top-start">
      <Text as="time" dateTime={dateTime}>
        {children}
      </Text>
    </Tooltip>
  );
};
