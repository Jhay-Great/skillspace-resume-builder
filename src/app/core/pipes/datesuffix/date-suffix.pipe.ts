import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSuffix',
  standalone: true,
})
export class DateSuffixPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Add suffix to the day
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';

    return `${day}${daySuffix} ${month} ${year}`;
  }
}
