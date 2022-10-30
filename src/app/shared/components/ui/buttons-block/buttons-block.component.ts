import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
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
  @Input() type:
    | 'artists'
    | 'artistsAdmin'
    | 'artistAdmin'
    | 'mediaAdmin'
    | 'styles'
    | 'styleAdmin' = 'artists';
  buttons: ButtonBlockItem[] = [];
  @Output() changeView = new EventEmitter<string>();
  @Output() search = new EventEmitter<{ text: string; type: string }>();
  @Output() onClickButton = new EventEmitter<ButtonBlockItem>();

  view = 'gallery';
  viewLSKey = 'view_artist';
  searchState = false;

  ngOnInit(): void {
    this.setButtons();
    if (this.buttons[0].action.includes('view')) {
      this.clickButton(this.buttons[0]);
    }
  }

  setButtons() {
    const category = buttonsByType.filter((item) => item.name === this.type)[0];
    this.buttons = category.buttons;
  }

  clickButton(button: ButtonBlockItem) {
    if (button.action.includes('view')) {
      this.onClickViewsButtons(button);
    } else if (button.action === 'search') {
      this.searchState = !this.searchState;
    } else {
      this.onClickButton.emit(button);
    }
  }

  onClickViewsButtons(button: ButtonBlockItem) {
    localStorage.setItem(this.viewLSKey, button.action);
    if (button.isActive) {
      this.setViewButtonsInactive();
    } else {
      this.setViewButtonsInactive();

      button.isActive = true;
    }
    this.onClickButton.emit(button);
  }

  private setViewButtonsInactive(): void {
    for (const item of this.buttons) {
      if (item.action.includes('view') && item.isActivatable) {
        item.isActive = false;
      }
    }
  }
}
