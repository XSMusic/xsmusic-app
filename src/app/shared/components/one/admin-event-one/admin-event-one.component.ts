import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { ShowImageI } from '@interfaces';
import { Event, Image, Style } from '@models';

@Component({
  selector: 'admin-event-one',
  templateUrl: 'admin-event-one.component.html',
  animations: [inOutAnimation],
})
export class AdminEventOneComponent {
  @Input() event = new Event();
  styles: Style[] = [];
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  types = [
    { name: 'Club', value: 'club' },
    { name: 'Festival', value: 'festival' },
  ];
  image = '';
  imageState = false;
  tempImagesByUrl: string[] = [];
  tempImagesByFile: File[] = [];
  @Output() onSubmit = new EventEmitter<{ scraping: any }>();
  @Output() showImage = new EventEmitter<ShowImageI>();
  @Output() uploadImageByUrl = new EventEmitter<string>();
  @Output() uploadImageByFile = new EventEmitter<File>();
  @Output() removeImage = new EventEmitter<Image>();
  @Output() setFirstImage = new EventEmitter<Image>();
  @Output() delete = new EventEmitter<Image>();
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate([
      routesConfig.event.replace(':slug', this.event.slug!),
    ]);
  }
}
