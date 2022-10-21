import { style, animate, trigger, transition } from '@angular/animations';
export const inOutAnimation = trigger('inOut', [
  transition(':enter', [
    style({ opacity: 0 }), //apply default styles before animation starts
    animate('400ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('400ms ease-in-out', style({ opacity: 0 })),
  ]),
]);
