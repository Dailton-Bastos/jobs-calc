import {
  Box,
  List,
  ListItem,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { useSearchContext } from '~/hooks/useSearchContext';

export const Results = () => {
  const { results, selectedSave } = useSearchContext();

  const color = useColorModeValue('primary.dark', 'secondary.light');

  return (
    <Box
      pt="4"
      pb="2"
      pl="4"
      pr="4"
      maxH="420px"
      overflowY="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'orange.500',
          borderRadius: '24px',
        },
      }}
    >
      <List>
        {results?.map((job) => (
          <ListItem
            key={job.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py="2"
          >
            <Button
              color={color}
              variant="link"
              fontSize="sm"
              fontWeight="bold"
              title={job.title.fullTitle}
              onClick={() => selectedSave(job)}
            >
              {job.title.shortTitle}
            </Button>

            <Text fontSize="smaller" fontWeight="normal" variant="secondary">
              {job.type}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
