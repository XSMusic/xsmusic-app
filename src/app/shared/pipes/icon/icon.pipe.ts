import { Pipe, PipeTransform } from '@angular/core';
import { icons } from '@core/config/icons.config';

@Pipe({
  name: 'icon',
})
export class IconPipe implements PipeTransform {
  transform(name: any, ...args: any[]): any {
    const className = `w-${'5'} h-${'5'}`;
    return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="${className}"
>
  ${icons[name]}
</svg>`;
  }
}
