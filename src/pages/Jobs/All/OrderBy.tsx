import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';

import type { OrderBy as OrderByType } from '~/@types/job';
import { useJobsContext } from '~/hooks/useJobsContext';

type PropsTypes = {
  orderItems: Array<{
    title: string;
    type: OrderByType;
  }>;
  children: string;
};

export const OrderBy = ({ orderItems = [], children }: PropsTypes) => {
  const { orderBy, handleSelectedOrder } = useJobsContext();
  const bg = useColorModeValue('secondary.light', 'primary.dark');

  return (
    <Flex align="center" gap="4">
      <Menu autoSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              rightIcon={isOpen ? <IoChevronUp /> : <IoChevronDown />}
              variant="solid"
              colorScheme="white"
              color="white"
              p="0"
            >
              {children}
            </MenuButton>
            <MenuList boxShadow="lg" bg={bg}>
              {orderItems?.map((item) => (
                <MenuItem
                  key={item?.type}
                  onClick={() => {
                    orderBy(item?.type);
                    handleSelectedOrder(item?.title);
                  }}
                  fontWeight="semibold"
                  py="2"
                >
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
