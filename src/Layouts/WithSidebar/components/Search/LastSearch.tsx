import { CgUndo } from 'react-icons/cg';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Box, List, ListItem, Link, Text } from '@chakra-ui/react';

export const LastSearch = () => {
  return (
    <Box pt="4" pb="2" pl="4" pr="4" borderTop="1px" borderColor="gray.50">
      <Text fontSize="sm" color="gray.500">
        Últimas buscas
      </Text>

      <List mt="2">
        <ListItem
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py="2"
        >
          <Link
            as={ReactRouterLink}
            to="/"
            display="flex"
            alignItems="center"
            fontSize="sm"
            fontWeight="bold"
            _hover={{
              textDecoration: 'none',
            }}
          >
            <CgUndo size={24} /> [Fibra Cirúrgica] Vitrines customizadas ...
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
            display="flex"
            alignItems="center"
            fontSize="sm"
            fontWeight="semibold"
            _hover={{
              textDecoration: 'none',
            }}
          >
            <CgUndo size={24} /> [Covabra] Banners não exibem
          </Link>

          <Text fontSize="smaller" fontWeight="normal">
            Orçamento
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
            display="flex"
            alignItems="center"
            fontSize="sm"
            fontWeight="semibold"
            _hover={{
              textDecoration: 'none',
            }}
          >
            <CgUndo size={24} /> Café AVANTI ☕︎ Aniversário 18 anos 🎉🎂
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
            display="flex"
            alignItems="center"
            fontSize="sm"
            fontWeight="semibold"
            _hover={{
              textDecoration: 'none',
            }}
          >
            <CgUndo size={24} /> [Covabra] Análise de requisição da Geolo...
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
            display="flex"
            alignItems="center"
            fontSize="sm"
            fontWeight="semibold"
            _hover={{
              textDecoration: 'none',
            }}
          >
            <CgUndo size={24} /> [RNTINTAS] EXECUÇÃO - Melhoria do sub me...
          </Link>

          <Text fontSize="smaller" fontWeight="normal">
            Desenvolvimento
          </Text>
        </ListItem>
      </List>
    </Box>
  );
};
