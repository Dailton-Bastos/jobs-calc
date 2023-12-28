import React from 'react';

import { SearchContext } from '~/contexts/Search/SearchContext';

export const useSearchContext = () => React.useContext(SearchContext);
