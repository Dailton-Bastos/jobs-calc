import React from 'react';
import { DateRangePicker, RangeKeyDict, Range } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export const Calendar = () => {
  const [date, setDate] = React.useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleOnChange = React.useCallback((rangesByKey: RangeKeyDict) => {
    const { selection } = rangesByKey;

    setDate([selection]);
  }, []);

  return (
    <DateRangePicker
      onChange={handleOnChange}
      months={2}
      ranges={date}
      direction="horizontal"
      rangeColors={['#F1972C']}
      color="#F1972C"
      dateDisplayFormat="dd MMM, yyyy"
    />
  );
};
