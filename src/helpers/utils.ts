/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-duplicates */
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { FormattedJobCycle, JobCycles, JobCyclesByDate } from '~/@types/cycles';

export function formatTime(hour: number, minutes: number) {
  const formattedHour = Number(hour).toString().padStart(2, '0');
  const formattedMinutes = Number(minutes).toString().padStart(2, '0');

  return `${formattedHour}h:${formattedMinutes}m`;
}

export function formatDate(timestamp: number) {
  if (!timestamp) return 'Data inválida';

  return format(new Date(timestamp), "dd MMM yyyy, 'às 'HH:mm'", {
    locale: pt,
  });
}

export function formatDateWithoutHours(timestamp: number) {
  return format(new Date(timestamp), 'dd/MM/yyyy', {
    locale: pt,
  });
}

export function formatHour(timestamp: number) {
  return format(new Date(timestamp), 'HH:mm', {
    locale: pt,
  });
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

export function secondsToTime(totalInSeconds: number) {
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
}

export function formatJobCyclesByDate(cyclesByDate: JobCyclesByDate) {
  const data: JobCycles[] = Object.keys(cyclesByDate)?.map((key: string) => {
    const totalCyleDate = cyclesByDate[key]?.reduce(
      (acc: number, cycle: FormattedJobCycle) => {
        acc += cycle?.totalCycleInSeconds;
        return acc;
      },
      0,
    );

    const { hours, minutes } = secondsToTime(totalCyleDate);

    return {
      id: uuid(),
      date: cyclesByDate[key][0]?.date,
      totalHoursByDate: `${hours}h:${minutes}m`,
      totalCycleInSeconds: totalCyleDate,
      cycles: cyclesByDate[key]?.map((cycle) => {
        return {
          id: uuid(),
          startDate: cycle?.startDate,
          fineshedDate: cycle?.fineshedDate,
          totalCycle: cycle?.totalCycle,
          isActive: cycle?.isActive,
        };
      }),
    };
  });

  return { cycles: data };
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

export const STATUS_COLORS = {
  yellow: 'yellow.500',
  red: 'red.500',
  green: 'green.500',
  blue: 'blue.500',
  initial: '-moz-initial',
} as const;
