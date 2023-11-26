import { DateRangePicker, RangeKeyDict, Range } from 'react-date-range';

import { useColorMode } from '@chakra-ui/react';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './styles.css';

interface Props {
  ranges: Range[];
  onChange: (rangesByKey: RangeKeyDict) => void;
}

export const Calendar = ({ ranges, onChange }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <DateRangePicker
      onChange={onChange}
      months={2}
      moveRangeOnFirstSelection={false}
      ranges={ranges}
      direction="horizontal"
      rangeColors={['#F1972C']}
      color="#F1972C"
      className={`dateRangePickerContainer ${
        colorMode === 'dark' ? 'dark' : ''
      }`}
    />
  );
};
