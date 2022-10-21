import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ModalService, ToastService } from '@services';
import { MODAL_STATE } from '@shared/services/ui/modal/modal.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'artists-block-buttons',
  templateUrl: 'artists-block-buttons.component.html',
})
export class ArtistsBlockButtonsComponent implements OnInit {
  @Output() changeView = new EventEmitter<string>();
  view = 'gallery';
  viewLSKey = 'view_artist';

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
}
