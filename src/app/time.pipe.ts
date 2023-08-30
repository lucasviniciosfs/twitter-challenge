import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let timing = (new Date().getTime() - Number.parseInt(value)) / 1000;
    if(timing <= 1)
      return 'Agora'
    else if (timing <= 60)
      return timing.toFixed(0).concat('s')
    return new Date(Number.parseInt(value)).toLocaleString();
  }

}
