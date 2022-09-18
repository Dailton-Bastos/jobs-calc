/* eslint-disable import/no-duplicates */
import { format, intervalToDuration } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { JobStatus, JobTypes } from '~/@types/job';

export function jobType(type: JobTypes) {
  let result = '';

  switch (type) {
    case 'development':
      result = 'Desenvolvimento';
      break;

    case 'other':
      result = 'Outro';
      break;

    default:
      result = 'Orçamento';
      break;
  }

  return result;
}

export function jobStatus(status: JobStatus) {
  const result = {
    title: '',
    color: '',
  };

  switch (status) {
    case 'paused':
      result.title = 'Em pausa';
      result.color = '#ED8936';
      break;

    case 'developing':
      result.title = 'Em desenvolvimento';
      result.color = '#ECC94B';
      break;

    case 'done':
      result.title = 'Finalizado';
      result.color = '#48BB78';
      break;

    default:
      result.title = 'Em aberto';
      result.color = '#3182CE';
      break;
  }

  return result;
}

export function formatTime(hour: number, minutes: number) {
  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHour}h:${formattedMinutes}m`;
}

export function formatDate(unix: number) {
  return format(new Date(unix), "dd MMM yyyy, 'às 'HH:mm'", {
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
