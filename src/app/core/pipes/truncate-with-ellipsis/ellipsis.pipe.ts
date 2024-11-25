import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone: true
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string | null, maxLength: number = 20): string {
    if (!value) return ''; 
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }
}
