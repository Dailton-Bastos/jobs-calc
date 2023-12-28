import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import { IconButton } from '@chakra-ui/react';

type Props = {
  control: 'top' | 'bottom';
  onClick: () => void;
};

export const ControlTime = ({ control, onClick }: Props) => {
  const Icon = control === 'top' ? IoIosArrowUp : IoIosArrowDown;

  return (
    <IconButton
      aria-label={control}
      icon={<Icon size={26} color="#DD6B20" />}
      onClick={onClick}
      variant="ghost"
    />
  );
};
