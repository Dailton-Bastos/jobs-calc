/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-duplicates */
import { differenceInSeconds, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import type { CycleApiData, CycleFormatted } from '~/@types/cycles';
import type {
  JobStatus,
  JobType,
  Report,
  ReportCommon,
  FormattedReportCommon,
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

export function groupBy<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string,
) {
  return array.reduce((acc, value, index, items) => {
    (acc[predicate(value, index, items)] ||= []).push(value);

    return acc;
  }, {} as { [key: string]: T[] });
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

export function getJobType(type: JobType) {
  switch (type) {
    case 'development':
      return 'Desenvolvimento';
    case 'budget':
      return 'Orçamento';

    default:
      return 'Interno';
  }
}

export function getJobStatus(status: JobStatus) {
  switch (status) {
    case 'opened':
      return {
        type: 'opened' as const,
        title: 'Em aberto',
        statusColor: 'blue' as const,
      };

    case 'paused':
      return {
        type: 'paused' as const,
        title: 'Em espera',
        statusColor: 'red' as const,
      };

    case 'done':
      return {
        type: 'done' as const,
        title: 'Concluído',
        statusColor: 'green' as const,
      };

    default:
      return {
        type: 'developing' as const,
        title: 'Em andamento',
        statusColor: 'orange' as const,
      };
  }
}

export const getTime = (time: number) => {
  const title = formatDate(time);

  const label = format(new Date(time), "EEEE',' dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });

  const datetime = format(new Date(time), "yyyy'-'MM'-'dd HH':'mm':'ss", {
    locale: pt,
  });

  return {
    title,
    label,
    datetime,

    time: {
      title,
      label,
      datetime,
    },
  };
};

function getFormattedReportCommon(data: CycleApiData[]) {
  const reports = data.reduce(
    (accumulator: FormattedReportCommon[], currentValue: CycleApiData) => {
      const dateTitle = format(
        new Date(currentValue.startDate),
        "dd'/'MM'/'yyyy",
      );

      const { label, datetime } = getTime(currentValue.startDate);

      const timestamp = currentValue.startDate;

      const report: FormattedReportCommon = {
        ...currentValue,
        date: {
          title: dateTitle,
          label,
          datetime,
          timestamp,
        },
      };

      accumulator.push(report);

      return accumulator;
    },
    [],
  );

  return { reports };
}

const formatCycle = (cycle: FormattedReportCommon): CycleFormatted => {
  const totalCycleInSeconds = cycle?.fineshedDate
    ? differenceInSeconds(
        new Date(cycle.fineshedDate),
        new Date(cycle.startDate),
      )
    : 0;
  const { hours, minutes } = secondsToTime(totalCycleInSeconds);

  return {
    id: cycle?.id ?? uuid(),
    jobId: cycle?.jobId,
    isActive: cycle?.isActive,
    startHour: formatHour(cycle?.startDate),
    finishedHour: cycle?.fineshedDate ? formatHour(cycle?.fineshedDate) : '',
    total: `${hours}h:${minutes}m`,
  };
};

export function getJobReports(data: CycleApiData[], jobId: string) {
  const jobCycles = data?.filter((cycle) => cycle.jobId === jobId);

  const { reports: jobCyclesToFilter } = getFormattedReportCommon(data);

  const { reports: ReportsCommon } = getFormattedReportCommon(jobCycles);

  const filterCyclesByDate = groupBy<ReportCommon>(
    ReportsCommon,
    (value) => value.date?.title,
  );

  const jobReports = Object.keys(filterCyclesByDate)
    .map((key) => {
      const cycles = jobCyclesToFilter?.filter((cycle) => {
        return cycle?.date?.title === filterCyclesByDate[key][0].date.title;
      });

      return { ...filterCyclesByDate[key][0], cycles };
    })
    .sort((a, b) => b.cycles[0].startDate - a.cycles[0].startDate);

  const reports = jobReports?.map((report): Report => {
    const cycles = report.cycles.map((cycle) => formatCycle(cycle));

    const totalHoursByDate = report.cycles?.reduce(
      (total: number, cycle: FormattedReportCommon) => {
        const totalCycleInSeconds = cycle?.fineshedDate
          ? differenceInSeconds(
              new Date(cycle.fineshedDate),
              new Date(cycle.startDate),
            )
          : 0;

        total += totalCycleInSeconds;

        return total;
      },
      0,
    );

    const { hours, minutes } = secondsToTime(totalHoursByDate);

    return {
      id: report?.id,
      jobId: report?.jobId,
      date: report?.date,
      totalUsedTime: `${hours}h:${minutes}m`,
      cycles,
    };
  });

  return { reports };
}

export function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
}

export const jobTypeOptions = [
  {
    name: 'Interno',
    value: 'other',
    statusColor: 'orange' as const,
  },
  {
    name: 'Orçamento',
    value: 'budget',
    statusColor: 'orange' as const,
  },
  {
    name: 'Desenvolvimento',
    value: 'development',
    statusColor: 'orange' as const,
  },
];

export const jobStatusOptions = [
  {
    name: 'Em aberto',
    value: 'opened',
    statusColor: 'blue' as const,
  },
  {
    name: 'Em andamento',
    value: 'developing',
    statusColor: 'yellow' as const,
  },
  {
    name: 'Em pausa',
    value: 'paused',
    statusColor: 'gray' as const,
  },
  {
    name: 'Concluído',
    value: 'done',
    statusColor: 'green' as const,
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

export const editorMockup = `
**TOTAL (H):**

**NÍVEL DE IMPACTO:**

**TECNOLOGIAS:**

**PASSO A PASSO PARA O DESENVOLVIMENTO:**

-

**RECURSOS DE APOIO:**

-

**IMPEDITIVOS/ANOTAÇÕES**

-
`;

export const orderItemsStatus = [
  {
    title: 'Todos',
    type: 'all' as const,
  },
  {
    title: 'Em andamento',
    type: 'developing' as const,
  },
  {
    title: 'Em aberto',
    type: 'opened' as const,
  },
  {
    title: 'Em espera',
    type: 'paused' as const,
  },
  {
    title: 'Concluído',
    type: 'done' as const,
  },
];

export const orderItemsType = [
  {
    title: 'Todos',
    type: 'all' as const,
  },
  {
    title: 'Desenvolvimento',
    type: 'development' as const,
  },
  {
    title: 'Orçamento',
    type: 'budget' as const,
  },
  {
    title: 'Interno',
    type: 'other' as const,
  },
];
