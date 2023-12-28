import { formatHour } from '~/helpers/utils';

import { TimePickerSelection } from './TimePickerSelection';

type Props = {
  hour: string;
  minute: string;
  setMinute: (minute: string) => void;
  startDate: number | undefined;
  notShowExclude?: boolean;
  exclude?: number[];
};
export const MinuteWheel = ({
  hour,
  minute,
  setMinute,
  startDate,
  ...rest
}: Props) => {
  const startMinute = startDate ? formatHour(startDate).split(':')[1] : '';
  const startHour = startDate ? formatHour(startDate).split(':')[0] : '';

  const exclude =
    startHour !== hour
      ? undefined
      : startMinute
      ? Array.from(Array(Number(startMinute)).keys())
      : undefined;

  return (
    <TimePickerSelection
      start={0}
      end={59}
      value={minute}
      setValue={setMinute}
      exclude={exclude}
      {...rest}
    />
  );
};
