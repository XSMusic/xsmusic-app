import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Media } from '@models';

@Component({
  selector: 'last-media-item',
  templateUrl: './last-media-item.component.html',
})
export class LastMediaItemComponent implements OnInit {
  @Input() media!: Media;
  @Input() loading = true;
  @Input() type: 'one' | 'multi' = 'one';
  @Output() goToMedia = new EventEmitter<Media>();
  width = window.innerWidth;
  height = '';

  ngOnInit(): void {
    if (this.type === 'one') {
      this.height = this.width > 500 ? '21rem' : '10rem';
    } else {
      this.height = '10rem';
    }
  }
}
