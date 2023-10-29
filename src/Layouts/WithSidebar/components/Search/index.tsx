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

import { useSearchContext } from '~/hooks/useSearchContext';

import { Input } from './Input';
import { LastSearch } from './LastSearch';
import { NotFound } from './NotFound';
import { Results } from './Results';

export const Search = () => {
  const inputFocus = React.useRef<HTMLInputElement | null>(null);

  const { results, cleanResults } = useSearchContext();

  return (
    <Popover
      initialFocusRef={inputFocus}
      gutter={2}
      isLazy
      onClose={cleanResults}
    >
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
          {results.length > 0 ? <Results /> : <NotFound />}

          <LastSearch />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
