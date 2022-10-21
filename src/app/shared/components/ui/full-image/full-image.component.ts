import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'full-image',
  templateUrl: 'full-image.component.html',
  styleUrls: ['./full-image.component.css'],
  animations: [
    trigger('imageTrigger', [
      state('open', style({  opacity: 100 })),
      state('close', style({ opacity: 0, })),
      transition('open <=> close', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class FullImageComponent {
  constructor(public fullImage: FullImageService) {}

  dismiss(): void {
    this.fullImage.dismissImageFull();
  }
}
