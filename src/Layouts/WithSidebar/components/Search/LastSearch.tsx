import { CgUndo } from 'react-icons/cg';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Box,
  List,
  ListItem,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useSearchContext } from '~/hooks/useSearchContext';

export const LastSearch = () => {
  const { value, isLoading, recentSearchs } = useSearchContext();

  const notShowRecentSearchs =
    value.length > 0 || isLoading || recentSearchs.length === 0;

  const color = useColorModeValue('primary.dark', 'secondary.light');

  if (notShowRecentSearchs) return <></>;

  return (
    <Box pt="4" pb="2" pl="4" pr="4">
      <Text fontSize="sm" variant="secondary">
        Últimas buscas
      </Text>

      <List mt="2">
        {recentSearchs?.map((job) => (
          <ListItem
            key={job.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py="2"
          >
            <Link
              as={ReactRouterLink}
              to={`/jobs/${job.id}`}
              display="flex"
              alignItems="center"
              fontSize="sm"
              fontWeight="bold"
              title={job.title.fullTitle}
              color={color}
            >
              <CgUndo size={24} /> {job.title.shortTitle}
            </Link>

            <Text fontSize="smaller" fontWeight="normal" variant="secondary">
              {job.type}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
