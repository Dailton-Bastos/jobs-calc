import React from 'react';
import { IconType } from 'react-icons';

import { IconButton, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  icon: IconType;
  label: string;
}

export const ProgressButton = ({ icon: Icon, label, ...props }: Props) => {
  return (
    <IconButton
      aria-label={label}
      variant="outline"
      colorScheme="gray"
      size="lg"
      icon={<Icon size={28} />}
      {...props}
    />
  );
};
