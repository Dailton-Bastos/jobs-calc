import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {
  children: string;
};

export const SubmitButton = ({ children, ...rest }: Props) => {
  return (
    <ChakraButton
      colorScheme="whatsapp"
      variant="solid"
      width="100%"
      maxW="181px"
      height="50px"
      type="submit"
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};
