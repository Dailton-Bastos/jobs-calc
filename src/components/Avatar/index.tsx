import { Avatar as ChakraAvatar, Box } from '@chakra-ui/react';
import type { AvatarProps, BoxProps } from '@chakra-ui/react';

type Props = AvatarProps & {
  showBorder?: boolean;
  boxProps?: BoxProps;
};

export const Avatar = ({ showBorder = false, boxProps, ...props }: Props) => {
  if (showBorder) {
    return (
      <Box
        p="2px"
        bg="orange.500"
        borderRadius="full"
        boxShadow="md"
        {...boxProps}
      >
        <ChakraAvatar p="1px" bg="white" {...props} />
      </Box>
    );
  }

  return <ChakraAvatar {...props} />;
};
