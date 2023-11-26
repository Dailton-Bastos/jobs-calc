import { RiEdit2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { Heading, Flex, Tooltip, IconButton } from '@chakra-ui/react';

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
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="space-between"
      borderBottom="1.5px solid #E1E3E5"
      pb="4"
    >
      <Heading as="h1" size="lg" variant="primary">
        {title}
      </Heading>

      {withTooltip && (
        <Tooltip label={label} hasArrow arrowSize={15} aria-label={label}>
          <IconButton
            aria-label="Editar"
            variant="ghost"
            icon={<RiEdit2Line size={22} />}
            onClick={() => navigate(url)}
          />
        </Tooltip>
      )}
    </Flex>
  );
};
