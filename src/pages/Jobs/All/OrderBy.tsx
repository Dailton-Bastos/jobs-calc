import React from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

import {
  Flex,
  Text,
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';

import { useJobsContext } from '~/hooks/useJobsContext';

export const OrderBy = () => {
  const { orderBy, selectedOrder, handleSelectedOrder } = useJobsContext();
  const bg = useColorModeValue('secondary.light', 'primary.dark');

  const orderItems = React.useMemo(
    () => [
      {
        title: 'Todos',
        type: 'all' as const,
      },
      {
        title: 'Em andamento',
        type: 'developing' as const,
      },
      {
        title: 'Em aberto',
        type: 'opened' as const,
      },
      {
        title: 'Em espera',
        type: 'paused' as const,
      },
      {
        title: 'Concluído',
        type: 'done' as const,
      },
      {
        title: 'Orçamento',
        type: 'budget' as const,
      },
      {
        title: 'Desenvolvimento',
        type: 'development' as const,
      },
      {
        title: 'Interno',
        type: 'other' as const,
      },
    ],
    [],
  );

  return (
    <Flex align="center" gap="4">
      <Text>Ordernar por</Text>

      <Menu autoSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              rightIcon={isOpen ? <IoChevronUp /> : <IoChevronDown />}
              minW="56"
              bg={bg}
              variant="solid"
              // colorScheme="white"
              boxShadow="base"
              _hover={{
                bg: bg,
              }}
              _active={{
                bg: bg,
              }}
            >
              {selectedOrder}
            </MenuButton>
            <MenuList boxShadow="lg" bg={bg}>
              {orderItems?.map((item) => (
                <MenuItem
                  key={item?.type}
                  onClick={() => {
                    orderBy(item?.type);
                    handleSelectedOrder(item?.title);
                  }}
                  position="relative"
                  fontWeight="semibold"
                  py="2"
                >
                  {selectedOrder === item?.title && (
                    <Box
                      h="100%"
                      w="2px"
                      bg="orange.500"
                      position="absolute"
                      left="0"
                      top="0"
                    />
                  )}
                  {item?.title}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};
