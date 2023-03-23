import { GridItem, Text } from '@chakra-ui/react';

import { STATUS_COLORS } from '~/helpers/utils';

interface Props {
  title: string;
  statusColor?: keyof typeof STATUS_COLORS;
  children: React.ReactElement;
}

export const InfoJob = ({
  title,
  statusColor = 'initial',
  children,
}: Props) => {
  return (
    <GridItem w="100%">
      <Text fontWeight="bold" mb="2">
        {title}
      </Text>
      <Text fontSize="md" color={STATUS_COLORS[statusColor]}>
        {children}
      </Text>
    </GridItem>
  );
};
