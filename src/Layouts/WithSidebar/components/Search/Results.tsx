import { Link as ReactRouterLink } from 'react-router-dom';

import { Box, List, ListItem, Link, Text } from '@chakra-ui/react';

export const Results = () => {
  return (
    <Box pt="4" pb="2" pl="4" pr="4" borderTop="1px" borderColor="gray.50">
      <List>
        <ListItem
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py="2"
        >
          <Link
            as={ReactRouterLink}
            to="/"
            fontSize="sm"
            fontWeight="bold"
            _hover={{
              textDecoration: 'none',
            }}
          >
            [Fibra Cirúrgica] Vitrines customizadas ...
          </Link>

          <Text fontSize="smaller" fontWeight="normal">
            Desenvolvimento
          </Text>
        </ListItem>

        <ListItem
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py="2"
        >
          <Link
            as={ReactRouterLink}
            to="/"
            fontSize="sm"
            fontWeight="bold"
            _hover={{
              textDecoration: 'none',
            }}
          >
            Café AVANTI ☕︎ Aniversário 18 anos 🎉🎂
          </Link>

          <Text fontSize="smaller" fontWeight="normal">
            Interno
          </Text>
        </ListItem>

        <ListItem
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py="2"
        >
          <Link
            as={ReactRouterLink}
            to="/"
            fontSize="sm"
            fontWeight="bold"
            _hover={{
              textDecoration: 'none',
            }}
          >
            [Covabra] Banners não exibem
          </Link>

          <Text fontSize="smaller" fontWeight="normal">
            Orçamento
          </Text>
        </ListItem>
      </List>
    </Box>
  );
};
