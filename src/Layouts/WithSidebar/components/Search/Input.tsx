import React from 'react';
import { GoSearch } from 'react-icons/go';

import {
  FormControl,
  Input as ChakraInput,
  InputLeftElement,
  InputGroup,
  Icon,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

import type { JobFormatted } from '~/@types/job';
import { searchJobByQuery } from '~/helpers/fakeApiCall';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useSearchContext } from '~/hooks/useSearchContext';

type Props = {
  inputFocus: React.MutableRefObject<HTMLInputElement | null>;
};

export const Input = ({ inputFocus }: Props) => {
  const debounceRef = React.useRef<NodeJS.Timeout>();

  const { isLoading, startSearch, cleanResults, finishSearch, value } =
    useSearchContext();

  const { jobs } = useCyclesContext();

  const fuse = React.useMemo(() => {
    const options: IFuseOptions<JobFormatted> = {
      isCaseSensitive: false,
      distance: 100,
      location: 0,
      shouldSort: true,
      threshold: 0.6,
      keys: ['title.fullTitle', 'description'],
    };

    return new Fuse<JobFormatted>(jobs, options);
  }, [jobs]);

  const onQueryChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = event.target;

      startSearch(inputValue);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        if (inputValue.trim().length === 0) {
          cleanResults();

          return;
        }

        const searchResults = fuse.search(inputValue);

        const data = await searchJobByQuery(searchResults);

        finishSearch(data);
      }, 300);
    },
    [startSearch, cleanResults, finishSearch, fuse],
  );

  return (
    <FormControl>
      <InputGroup>
        <ChakraInput
          placeholder="Buscar"
          variant="flushed"
          border="none"
          focusBorderColor="none"
          value={value}
          onChange={onQueryChange}
          ref={inputFocus}
          _placeholder={{
            color: useColorModeValue('primary.dark', 'secondary.light'),
          }}
        />

        <InputLeftElement pointerEvents="none">
          {isLoading ? (
            <Spinner color="orange.500" size="sm" />
          ) : (
            <Icon as={GoSearch} color="orange.500" />
          )}
        </InputLeftElement>
      </InputGroup>
    </FormControl>
  );
};
