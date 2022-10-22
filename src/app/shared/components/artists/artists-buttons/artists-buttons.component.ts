import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ModalService, ToastService } from '@services';
import { MODAL_STATE } from '@shared/services/ui/modal/modal.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'artists-buttons',
  templateUrl: 'artists-buttons.component.html',
  animations: [
    trigger('searchTrigger', [
      state('close', style({ transform: 'translateY(0%)', width: '' })),
      state('open', style({ transform: 'translateY(-50%)', width: '200px' })),
      transition('open <=> close', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ArtistsButtonsComponent implements OnInit {
  @Input() viewButtons = false;
  @Output() changeView = new EventEmitter<string>();
  @Output() search = new EventEmitter<{ text: string; type: string }>();
  view = 'gallery';
  viewLSKey = 'view_artist';
  searchState = false;

  constructor(private toast: ToastService, private modal: ModalService) {}

  ngOnInit(): void {
    const view = localStorage.getItem(this.viewLSKey);
    if (view) {
      this.view = view;
      this.changeView.emit(this.view);
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

  openSearch() {}
}
