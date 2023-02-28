import React from 'react';

import { CyclesContext } from '~/contexts/Cycles/CyclesContext';

export const useCyclesContext = () => React.useContext(CyclesContext);
