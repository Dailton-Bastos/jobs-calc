import { GridItem, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  children: string;
}

export const InfoJob = ({ title, children }: Props) => {
  return (
    <GridItem w="100%">
      <Text fontWeight="bold" mb="2">
        {title}
      </Text>
      <Text fontSize="md">{children}</Text>
    </GridItem>
  );
};
