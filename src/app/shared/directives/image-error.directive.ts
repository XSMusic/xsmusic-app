import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[onError]',
})
export class OnImageErrorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('error')
  private onError() {
    this.el.nativeElement.src = 'assets/images/no-image.jpg';
  }
}
