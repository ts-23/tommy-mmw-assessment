import { parseDate, DateFormatter } from '@internationalized/date';

export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = parseDate(dateString);
  const formatter = new DateFormatter(locale, { dateStyle: 'full' });
  return formatter.format(date.toDate('UTC'));
}
