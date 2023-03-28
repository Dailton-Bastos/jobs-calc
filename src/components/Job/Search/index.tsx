import { RiCloseLine, RiSearchLine } from 'react-icons/ri';

import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  // InputRightElement,
} from '@chakra-ui/react';

interface Props {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cleanInput: () => void;
}

export const Search = ({ value, handleChange, cleanInput }: Props) => {
  return (
    <Box mt={4} width="50%">
      <InputGroup size="md">
        <InputLeftElement pr="2">
          {value ? (
            <Button size="sm" onClick={cleanInput} variant="ghost">
              <Icon as={RiCloseLine} boxSize="4" color="orange.300" />
            </Button>
          ) : (
            <Icon as={RiSearchLine} boxSize="4" color="orange.300" />
          )}
        </InputLeftElement>

        <Input
          type="text"
          placeholder="Pesquisar..."
          value={value}
          onChange={handleChange}
          _placeholder={{
            fontSize: '14px',
          }}
          variant="flushed"
          focusBorderColor="orange.300"
          _hover={{ borderColor: 'orange.300' }}
          _focusVisible={{ borderColor: 'orange.300' }}
        />

        {/* <InputRightElement>
          {value ? (
            <Button size="sm" onClick={cleanInput} variant="ghost">
              <Icon as={RiCloseLine} boxSize="4" color="orange.300" />
            </Button>
          ) : (
            <Icon as={RiSearchLine} boxSize="4" color="orange.300" />
          )}
        </InputRightElement> */}
      </InputGroup>
    </Box>
  );
};
