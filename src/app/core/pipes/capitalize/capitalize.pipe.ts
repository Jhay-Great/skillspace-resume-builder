import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  
  transform(value: string, allWords: boolean = false): string {
    if (!value) return value;
    
    if (allWords) {
      // Capitalize each word in the string
      return value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      // Capitalize only the first letter of the string
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  }

}
