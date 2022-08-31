import { FormLabel, FormLabelProps } from '@chakra-ui/react';

type Props = FormLabelProps & {
  children: string;
};

export const Label = ({ children, ...rest }: Props) => {
  return (
    <FormLabel mb="4" fontWeight="500" lineHeight="6" {...rest}>
      {children}
    </FormLabel>
  );
};
