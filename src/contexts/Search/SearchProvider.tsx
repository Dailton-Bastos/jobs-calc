import React from 'react';
import { useNavigate } from 'react-router-dom';

import { JobFormatted } from '~/@types/job';
import { usePersistentStorageValue } from '~/hooks/useLocalStorage';
import {
  cleanQueryAction,
  finishSearchAction,
  selectedSearchAction,
  startSearchAction,
} from '~/reducers/search/actions';
import { searchReducer } from '~/reducers/search/reducer';

import { SearchContext } from './SearchContext';

type Props = {
  children: JSX.Element;
};

export const SearchProvider = ({ children }: Props) => {
  const [redirectTo, setRedirectTo] = React.useState(false);

  const [state, dispatch] = React.useReducer(searchReducer, {
    isLoading: false,
    results: [],
    value: '',
  });

  const navigate = useNavigate();

  const [data, setData] = usePersistentStorageValue<JobFormatted[]>(
    '@jobs-calc-search',
    [],
  );

  const startSearch = React.useCallback((value: string) => {
    dispatch(startSearchAction(value));
  }, []);

  const finishSearch = React.useCallback((results: JobFormatted[]) => {
    dispatch(finishSearchAction(results));
  }, []);

  const selectedSave = React.useCallback((value: JobFormatted) => {
    dispatch(selectedSearchAction(value));
  }, []);

  const cleanResults = React.useCallback(() => {
    dispatch(cleanQueryAction());
  }, []);

  React.useEffect(() => {
    if (!state.selected) return;

    const { selected } = state;

    setData((prev) => {
      const alreadyExist = prev?.some((item) => item.id === selected?.id);

      if (alreadyExist) return [...prev];

      const lastSearch = prev?.slice(0, 4);

      return [{ ...selected }, ...lastSearch];
    });

    setRedirectTo(true);
  }, [state, setData, navigate]);

  React.useEffect(() => {
    if (!state.selected) return;

    const { selected } = state;

    if (redirectTo) {
      navigate(`/jobs/${selected.id}`);
    }
  }, [redirectTo, navigate, state]);

  const value = React.useMemo(
    () => ({
      ...state,
      finishSearch,
      selectedSave,
      startSearch,
      cleanResults,
      recentSearchs: data,
    }),
    [state, finishSearch, selectedSave, startSearch, cleanResults, data],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
