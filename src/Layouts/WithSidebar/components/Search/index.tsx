import React from 'react';
import { GoSearch } from 'react-icons/go';

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  useColorModeValue,
} from '@chakra-ui/react';

import { useSearchContext } from '~/hooks/useSearchContext';

import { Input } from './Input';
import { LastSearch } from './LastSearch';
import { NotFound } from './NotFound';
import { Results } from './Results';

export const Search = () => {
  const inputFocus = React.useRef<HTMLInputElement | null>(null);

  const { results, cleanResults } = useSearchContext();

  const bg = useColorModeValue('secondary.light', 'secondary.dark');
  const bgHover = useColorModeValue('transparent', 'whiteAlpha.300');

  return (
    <Popover
      initialFocusRef={inputFocus}
      gutter={2}
      isLazy
      onClose={cleanResults}
    >
      <PopoverTrigger>
        <Button
          variant={useColorModeValue('outline', 'solid')}
          leftIcon={<GoSearch />}
          maxW="100%"
          w="360px"
          colorScheme="gray"
          fontWeight="semibold"
          boxShadow="base"
          size="md"
          _hover={{
            bg: bgHover,
          }}
        >
          Buscar Job
        </Button>
      </PopoverTrigger>

      <PopoverContent w="600px" boxShadow="none" bg={bg}>
        <PopoverHeader px="0" py="1">
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
