/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-duplicates */
import { differenceInSeconds, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  Cycle,
  FormattedJobCycle,
  JobCycles,
  JobCyclesByDate,
} from '~/@types/cycles';
import {
  CycleData,
  JobByDate,
  JobStatus,
  JobType,
  CycleDataByCreatedAt,
  CyclesByDate,
} from '~/@types/job';

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

export function truncateString(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
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

  return { data };
}

export function getJobType(type: JobType) {
  switch (type) {
    case 'development':
      return 'Desenvolvimento';
    case 'budget':
      return 'Orçamento';

    default:
      return 'Outro';
  }
}

export function getJobStatus(status: JobStatus) {
  switch (status) {
    case 'opened':
      return {
        type: 'Em aberto',
        statusColor: 'blue' as const,
      };

    case 'paused':
      return {
        type: 'Em espera',
        statusColor: 'red' as const,
      };

    case 'done':
      return {
        type: 'Concluído',
        statusColor: 'green' as const,
      };

    default:
      return {
        type: 'Em andamento',
        statusColor: 'yellow' as const,
      };
  }
}

export const getTime = (time: number) => {
  const title = formatDate(time);

  const label = format(new Date(time), "EEEE',' dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });

  const dateTime = format(new Date(time), "yyyy'-'MM'-'dd HH':'mm':'ss", {
    locale: pt,
  });

  return {
    title,
    label,
    dateTime,

    time: {
      title,
      label,
      dateTime,
    },
  };
};

export function getJobCyles(listCycles: Cycle[]) {
  const jobCyles = listCycles.reduce(
    (accumulator: CycleData[], currentValue: Cycle) => {
      const cycleId = currentValue?.id ?? uuid();
      const isActive = currentValue.isActive;
      const startHour = formatHour(currentValue.startDate);
      const fineshedHour = currentValue?.fineshedDate
        ? formatHour(currentValue.fineshedDate)
        : '';

      const totalCycleInSeconds = currentValue?.fineshedDate
        ? differenceInSeconds(
            new Date(currentValue.fineshedDate),
            new Date(currentValue.startDate),
          )
        : 0;

      const {
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
      } = secondsToTime(totalCycleInSeconds);

      const total = `${totalHours}h:${totalMinutes}m:${totalSeconds}s`;

      const cycle: CycleData = {
        id: cycleId,
        isActive,
        startHour,
        fineshedHour,
        total,
        totalCycleInSeconds,
        createdAt: format(new Date(currentValue.startDate), "dd'/'MM'/'yyyy"),
      };

      accumulator.push(cycle);

      return accumulator;
    },
    [],
  );

  return { jobCyles };
}

export function getJobReports(listCycles: Cycle[]) {
  const cycles = listCycles.reduce(
    (accumulator: CycleDataByCreatedAt[], currentValue: Cycle) => {
      const cycleId = currentValue?.id ?? uuid();

      const { label, dateTime } = getTime(currentValue.startDate);

      const time = {
        label,
        title: format(new Date(currentValue.startDate), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
        dateTime,
      };

      const createdAt = format(
        new Date(currentValue.startDate),
        "dd'/'MM'/'yyyy",
      );

      const report = {
        id: cycleId,
        time,
        createdAt,
      };

      accumulator.push(report);

      return accumulator;
    },
    [],
  );

  const cyclesByDate: JobByDate = groupBy(cycles, 'createdAt');

  const { jobCyles } = getJobCyles(listCycles);

  const jobCyclesByDate: CyclesByDate[] = Object.keys(cyclesByDate).map(
    (key) => {
      const data = jobCyles.filter(
        (cycle) => cycle.createdAt === cyclesByDate[key][0].createdAt,
      );

      const totalHoursByDate = data?.reduce(
        (total: number, cycle: CycleData) => {
          total += cycle?.totalCycleInSeconds;

          return total;
        },
        0,
      );

      const { hours, minutes } = secondsToTime(totalHoursByDate);

      return {
        ...cyclesByDate[key][0],
        cycleTotalTime: `${hours}h:${minutes}m`,
        cycles: data,
      };
    },
  );

  return { jobCyclesByDate };
}

export function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
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

export const jobSelectStatus = [
  {
    name: 'Em aberto',
    value: 'opened',
    color: 'blue' as const,
  },
  {
    name: 'Em andamento',
    value: 'developing',
    color: 'yellow' as const,
  },
  {
    name: 'Concluído',
    value: 'done',
    color: 'green' as const,
  },
];

export const STATUS_COLORS = {
  yellow: 'yellow.500',
  red: 'red.500',
  green: 'green.500',
  gray: 'gray.500',
  blue: 'blue.500',
  orange: 'orange.500',
  initial: '-moz-initial',
} as const;

export const DOTS = '...';
