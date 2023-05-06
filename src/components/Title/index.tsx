import { RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Heading, Flex, Tooltip, Link as LinkChakra } from '@chakra-ui/react';

type Props = {
  title: string;
  url?: string;
  label?: string;
  withTooltip?: boolean;
};

export const Title = ({
  title,
  url = '',
  label,
  withTooltip = false,
}: Props) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      borderBottom="1.5px solid #E1E3E5"
      pb="4"
    >
      <Heading as="h1" size="lg" color="purple.700">
        {title}
      </Heading>

      {withTooltip && (
        <Tooltip label={label} hasArrow arrowSize={15} aria-label={label}>
          <LinkChakra
            as={Link}
            to={url}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="2"
            borderRadius="md"
            _hover={{
              bg: 'gray.200',
            }}
          >
            <RiEdit2Line size={22} />
          </LinkChakra>
        </Tooltip>
      )}
    </Flex>
  );
};
