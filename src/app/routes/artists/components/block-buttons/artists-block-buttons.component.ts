import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ToastService } from '@services';
import { ModalAlert } from '@shared/components/ui/modal-alert/modal-alert.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'artists-block-buttons',
  templateUrl: 'artists-block-buttons.component.html',
})
export class ArtistsBlockButtonsComponent implements OnInit {
  @Output() changeView = new EventEmitter<string>();
  view = 'gallery';
  viewLSKey = 'view_artist';

  constructor(private toast: ToastService) {}

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



  openFilter() {
     this.toast.showToast(TOAST_STATE.warning, '¡Estamos en obras!');
     setTimeout(() => {
       this.toast.dismissToast();
     }, 3000);
  }
}
