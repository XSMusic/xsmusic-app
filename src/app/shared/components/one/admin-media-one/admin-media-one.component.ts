import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ShowImageI } from '@interfaces';
import { Image, Media } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';

@Component({
  selector: 'admin-media-one',
  templateUrl: 'admin-media-one.component.html',
  animations: [inOutAnimation],
})
export class AdminMediaOneComponent {
  @Input() media: Media = new Media();
  @Input() type!: 'set' | 'track';
  @Input() scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  sources = [{ name: 'Youtube', value: 'youtube' }];
  image = '';
  imageState = false;
  defaultSite = '6367d34e5ba8b44fdf9476c2';
  @Output() onSubmit = new EventEmitter<{ scraping: any }>();
  @Output() showImage = new EventEmitter<ShowImageI>();
  @Output() uploadImageByUrl = new EventEmitter<string>();
  @Output() uploadImageByFile = new EventEmitter<File>();
  @Output() removeImage = new EventEmitter<Image>();
  @Output() setFirstImage = new EventEmitter<Image>();
  @Output() delete = new EventEmitter<Image>();
  @Output() goToProfile = new EventEmitter<GoToPageI>();

  ngOnInit() {
    this.media.type = this.type;
    this.setDefaultSite();
  }

  setDefaultSite() {
    this.media.site = { name: 'Desconocido', _id: this.defaultSite };
  }

  goToYoutube() {
    window.open(
      `https://www.youtube.com/watch?v=${this.media.sourceId!}`,
      '_blank'
    );
  }
}
