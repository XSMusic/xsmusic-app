import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ShowImageI } from '@interfaces';
import { Image, User } from '@models';

@Component({
  selector: 'admin-user-one',
  templateUrl: 'admin-user-one.component.html',
  animations: [inOutAnimation],
})
export class AdminUserOneComponent {
  @Input() user = new User();
  darkModeValues = [
    { name: 'Sistema', value: 'system' },
    { name: 'Activado', value: 'active' },
    { name: 'Desactivado', value: 'desactive' },
  ];
  roles = ['ADMIN', 'USER'];
  image = '';
  imageState = false;
  @Output() onSubmit = new EventEmitter<{ scraping: any }>();
  @Output() showImage = new EventEmitter<ShowImageI>();
  @Output() uploadImageByUrl = new EventEmitter<string>();
  @Output() uploadImageByFile = new EventEmitter<File>();
  @Output() removeImage = new EventEmitter<Image>();
  @Output() setFirstImage = new EventEmitter<Image>();
  @Output() delete = new EventEmitter<Image>();
}
