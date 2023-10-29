import React from 'react';
import { GoSearch } from 'react-icons/go';

import {
  FormControl,
  Input as ChakraInput,
  InputLeftElement,
  InputGroup,
  Icon,
  Spinner,
} from '@chakra-ui/react';

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

        const data = await searchJobByQuery(inputValue, jobs);

        finishSearch(data);
      }, 300);
    },
    [startSearch, cleanResults, jobs, finishSearch],
  );

  return (
    <FormControl>
      <InputGroup>
        <ChakraInput
          placeholder="Buscar"
          variant="flushed"
          border="none"
          focusBorderColor="white"
          value={value}
          onChange={onQueryChange}
          ref={inputFocus}
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
