import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ModalService, ToastService } from '@services';
import { MODAL_STATE } from '@shared/services/ui/modal/modal.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { buttonsByType } from './buttons-block.helper';
import { ButtonBlockItem } from './buttons-block.model';

@Component({
  selector: 'buttons-block',
  templateUrl: 'buttons-block.component.html',
  animations: [
    trigger('searchTrigger', [
      state('close', style({ transform: 'translateY(0%)', width: '' })),
      state('open', style({ transform: 'translateY(-50%)', width: '200px' })),
      transition('open <=> close', [animate('300ms ease-in-out')]),
    ]),
    inOutAnimation,
  ],
})
export class ButtonsBlockComponent implements OnInit {
  @Input() type: 'artists' | 'artistsAdmin' | 'styles' = 'artists';
  buttons: ButtonBlockItem[] = [];
  @Output() changeView = new EventEmitter<string>();
  @Output() search = new EventEmitter<{ text: string; type: string }>();
  @Output() onClickButton = new EventEmitter<ButtonBlockItem>();

  view = 'gallery';
  viewLSKey = 'view_artist';
  searchState = false;

  constructor(private toast: ToastService, private modal: ModalService) {}

  ngOnInit(): void {
    this.setButtons();
    const view = localStorage.getItem(this.viewLSKey);
    if (view) {
      const buttonsFiltered = this.buttons.filter(
        (item) => item.action === view
      );
      console.log(this.buttons.filter((item) => item.action === view));
      if (buttonsFiltered.length > 0) {
        const button = buttonsFiltered[0];
        this.clickButton(button);
      }
    } else {
      if (
        this.buttons[0].action === 'viewGallery' ||
        this.buttons[0].action === 'viewList'
      ) {
        this.clickButton(this.buttons[0]);
      }
    }
  }

  setButtons() {
    const category = buttonsByType.filter((item) => item.name === this.type)[0];
    this.buttons = category.buttons;
  }

  clickButton(button: ButtonBlockItem) {
    switch (button.action) {
      case 'viewGallery':
      case 'viewList':
        this.onClickViewsButtons(button);
        break;
      case 'search':
        this.searchState = !this.searchState;
        break;
      default:
        this.onClickButton.emit(button);
        break;
    }
  }

  onClickViewsButtons(button: ButtonBlockItem) {
    localStorage.setItem(this.viewLSKey, button.action);
    if (button.isActive) {
      console.log('esta activo', button.isActive);
      this.setViewButtonsInactive();
    } else {
      this.setViewButtonsInactive();

      button.isActive = true;
    }
    this.onClickButton.emit(button);
  }

  private setViewButtonsInactive(): void {
    for (const item of this.buttons) {
      if (item.action === 'viewList' || item.action === 'viewGallery') {
        item.isActive = false;
      }
    }
  }

  setView(view: string) {
    this.view = view;
    this.changeView.emit(this.view);
    localStorage.setItem(this.viewLSKey, view);
  }

  openOrder() {
    this.modal.showModal(MODAL_STATE.info, 'titulo loco', 'Vamossss');
  }

  openFilter() {
    this.toast.showToast(TOAST_STATE.warning, '¡Estamos en obras!');
  }
}
