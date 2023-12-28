import { formatHour } from '~/helpers/utils';

import { TimePickerSelection } from './TimePickerSelection';

type Props = {
  hour: string;
  setHour: (hour: string) => void;
  startDate: number | undefined;
  notShowExclude?: boolean;
  exclude?: number[];
};

export const HourWheel = ({
  hour: value,
  setHour: setValue,
  startDate,
  ...rest
}: Props) => {
  const startHour = startDate ? formatHour(startDate).split(':')[0] : '';

  const exclude = startHour
    ? Array.from(Array(Number(startHour)).keys())
    : undefined;

  return (
    <TimePickerSelection
      start={0}
      end={23}
      value={value}
      setValue={setValue}
      exclude={exclude}
      {...rest}
    />
  );
};
