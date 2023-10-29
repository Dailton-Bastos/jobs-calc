import React from 'react';

import { JobFormatted } from '~/@types/job';

type SearchContextData = {
  isLoading: boolean;
  results: JobFormatted[];
  value: string;
  recentSearchs: JobFormatted[];
  startSearch: (value: string) => void;
  selectedSave: (value: JobFormatted) => void;
  finishSearch: (results: JobFormatted[]) => void;
  cleanResults: () => void;
};

export const SearchContext = React.createContext<SearchContextData>({
  isLoading: false,
  results: [],
  recentSearchs: [],
  value: '',
  finishSearch: (results: JobFormatted[]) => results,
  selectedSave: () => null,
  startSearch: () => null,
  cleanResults: () => null,
});
