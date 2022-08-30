import { Heading, Box } from '@chakra-ui/react';

type Props = {
  children: string;
};

export const Title = ({ children }: Props) => {
  return (
    <Box borderBottom="1.5px solid #E1E3E5" pb="4">
      <Heading as="h1" size="lg" color="purple.700">
        {children}
      </Heading>
    </Box>
  );
};
