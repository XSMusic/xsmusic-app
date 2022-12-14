import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LastMultiItemsComponent } from '@components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { Artist, Image, Media } from '@models';
import { Router } from '@angular/router';
import { routerMock } from 'app/testing/services.mock';

describe('LastMultiItemsComponent', () => {
  let component: LastMultiItemsComponent;
  let fixture: ComponentFixture<LastMultiItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LastMultiItemsComponent, NgxPermissionsAllowStubDirective],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [
        NgxPermissionsService,
        { provide: Router, useValue: routerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LastMultiItemsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('type === set', () => {
    component.type = 'set';
    component.item = new Artist();
    component.item.sets = [];
    component.ngOnInit();
    expect(component.items).toEqual([]);
  });

  it('type === track', () => {
    component.type = 'track';
    component.item = new Artist();
    component.item.tracks = [];
    component.ngOnInit();
    expect(component.items).toEqual([]);
  });

  it('type === image', () => {
    component.type = 'image';
    component.item = new Artist();
    component.item.images = [];
    component.ngOnInit();
    expect(component.items).toEqual([]);
  });

  describe('goTo', () => {
    it('goTo -> set', () => {
      component.type = 'set';
      const media = new Media();
      media.slug = 'perro';
      component.goTo(media);
      expect(routerMock.navigate).toHaveBeenCalled();
    });

    it('goTo -> track', () => {
      component.type = 'track';
      const media = new Media();
      media.slug = 'perro';
      component.goTo(media);
      expect(routerMock.navigate).toHaveBeenCalled();
    });
  });

  // it('showFullImage', () => {
  //     const item = new Image();
  //     component.showFullImage(item);
  //     expect(fullImageServiceMock);
  // })
});
