/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-duplicates */
import { format, intervalToDuration } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

type DateType = number | null;

export function formatTime(hour: number, minutes: number) {
  const formattedHour = Number(hour).toString().padStart(2, '0');
  const formattedMinutes = Number(minutes).toString().padStart(2, '0');

  return `${formattedHour}h:${formattedMinutes}m`;
}

export function formatDate(unix: DateType) {
  if (!unix) return 'Data inválida';

  return format(new Date(Number(unix)), "dd MMM yyyy, 'às 'HH:mm'", {
    locale: pt,
  });
}

export function formatDateWithoutHour(date: Date) {
  return format(new Date(date), 'dd/MM/yyyy', {
    locale: pt,
  });
}

export function formatHour(date: Date) {
  return format(new Date(date), 'HH:mm', {
    locale: pt,
  });
}

export function formatIntervalDuration(dateStart: Date, dateEnd: Date) {
  return intervalToDuration({ start: dateStart, end: dateEnd });
}

export function groupBy(array: any[], key: string) {
  return array.reduce(
    (acc: Record<string, unknown[]>, item: Record<string, any>) => {
      if (!acc[item[key]]) acc[item[key]] = [];

      acc[item[key]].push(item);

      return acc;
    },
    {},
  );
}

export function getTotalTimeInSeconds(
  hour: number,
  minutes: number,
  seconds: number,
) {
  const totalHourInSeconds = hour * 60 * 60;
  const totalMinutesSeconds = minutes * 60;

  return totalHourInSeconds + totalMinutesSeconds + seconds;
}

export function uuid() {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    '',
  );
}

export const jobSelectTypes = [
  {
    name: 'Orçamento',
    value: 'budget',
  },
  {
    name: 'Desenvolvimento',
    value: 'development',
  },
  {
    name: 'Outro',
    value: 'other',
  },
];

export const secondsToTime = (totalInSeconds: number) => {
  const hours = Math.floor(totalInSeconds / 3600)
    .toString()
    .padStart(2, '0');

  const minutes = Math.floor((totalInSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');

  const seconds = Math.floor(totalInSeconds % 60)
    .toString()
    .padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { hours, minutes, seconds, formattedTime };
};

export const STATUS_COLORS = {
  yellow: 'yellow.500',
  red: 'red.500',
  green: 'green.500',
  blue: 'blue.500',
  initial: '-moz-initial',
} as const;
