import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  private daysOfWeek: { [key: number]: string } = {
    1: 'ראשון',
    2: 'שני',
    3: 'שלישי',
    4: 'רביעי',
    5: 'חמישי',
    6: 'שישי',
    7: 'שבת'
  };

  transform(value: number): string {
    return this.daysOfWeek[value] || '';
  }
}
