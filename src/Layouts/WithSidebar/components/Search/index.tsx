import React from 'react';
import { GoSearch } from 'react-icons/go';

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';

import { Input } from './Input';
// import { Results } from './Results';
// import { NotFound } from './NotFound';
import { LastSearch } from './LastSearch';

export const Search = () => {
  const inputFocus = React.useRef<HTMLInputElement | null>(null);

  return (
    <Popover initialFocusRef={inputFocus} gutter={2} isLazy>
      <PopoverTrigger>
        <Button
          variant="outline"
          bg="gray.50"
          leftIcon={<GoSearch />}
          maxW="100%"
          w="360px"
          h="8"
          fontWeight="normal"
          _hover={{
            bg: 'gray.50',
          }}
        >
          Buscar Job
        </Button>
      </PopoverTrigger>

      <PopoverContent w="600px" boxShadow="none">
        <PopoverHeader px="0" py="1" border="none">
          <Input inputFocus={inputFocus} />
        </PopoverHeader>

        <PopoverBody p="0">
          {/* <Results /> */}

          {/* <NotFound /> */}

          <LastSearch />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
