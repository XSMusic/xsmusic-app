import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { MessageI } from '@interfaces';
import { Club, Style } from '@models';
import { ToastService, ClubService } from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { countries } from 'assets/data/countries';

@Component({
  selector: 'admin-club-one',
  templateUrl: 'admin-club-one.component.html',
  animations: [inOutAnimation],
})
export class AdminClubOneComponent {
  @Input() club = new Club();
  @Input() styles: Style[] = [];
  countries = countries;
  darkModeValues = [
    { name: 'Sistema', value: 'system' },
    { name: 'Activado', value: 'on' },
    { name: 'Desactivado', value: 'off' },
  ];
  constructor(
    private clubService: ClubService,
    private fullImage: FullImageService,
    private toastService: ToastService,
    private router: Router
  ) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  onSubmit() {
    const observable = this.club._id
      ? this.clubService.update(this.club)
      : this.clubService.create(this.club);
    observable.subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.clubService.deleteOne(this.club._id!).subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSuccess(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([routesConfig.clubsAdmin]);
  }

  onClickStyleItem(item: { name: string; _id: string }) {
    this.club.styles = this.club.styles?.filter(
      (style) => style.name !== item.name
    );
  }

  onChangeStyleSelect(e: any) {
    if (this.club.styles!.length <= 3) {
      const newStyle = this.styles.find(
        (style) => style._id!.toString() === e.target.value.toString()
      );
      this.club.styles?.push(newStyle);
    } else {
      this.toastService.showToast(
        TOAST_STATE.warning,
        'No puedes añadir mas de 3 estilos'
      );
    }
  }
}
