import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {

  transform(value: string | null): string {
    return value ? value.substring(0, 2).toUpperCase() : '';
  }

}
