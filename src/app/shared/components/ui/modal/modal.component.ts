import { Component, Input, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Modal } from './modal.model';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  animations: [inOutAnimation]
})
export class ModalComponent implements OnInit {
  @Input() options = new Modal();

  constructor() {}

  ngOnInit() {
  }

  closeModal() {
    this.options.show = false;
  }
}
