import { IconType } from 'react-icons';

import { ListItem, Flex, Link, Icon, Text } from '@chakra-ui/react';

type Props = {
  children: string;
  url: string;
  icon: IconType;
};

export const NavLink = ({ children, url, icon }: Props) => {
  return (
    <ListItem>
      <Link
        href={url}
        w="100%"
        px="2"
        display="inline-block"
        color="gray.500"
        _hover={{
          textDecor: 'none',
          color: 'white',
        }}
      >
        <Flex gap="1.5" align="center">
          <Icon as={icon} />
          <Text as="span">{children}</Text>
        </Flex>
      </Link>
    </ListItem>
  );
};
