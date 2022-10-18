import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Modal } from '@shared/components/ui/modal/modal.model';

@Component({
  selector: 'artists-buttons-block',
  templateUrl: 'artists-buttons-block.component.html',
})
export class ArtistsButtonsBlockComponent implements OnInit {
  @Output() changeView = new EventEmitter<string>();
  view = 'gallery';
  optionsModal!: Modal;
  viewLSKey = 'view_artist';

  ngOnInit(): void {
    this.setOptionsModal();
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

  setOptionsModal() {
    this.optionsModal = new Modal(
      'filter',
      'Proximamente',
      '<b>¡Estamos en obras!</b>'
    );
  }
}
