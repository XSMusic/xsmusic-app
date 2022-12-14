import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlockInfoProfileImageComponent } from '@components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { Image, Site } from '@models';
import { Router } from '@angular/router';
import { fullImageServiceMock, routerMock } from 'app/testing/services.mock';

describe('BlockInfoProfileImageComponent', () => {
  let component: BlockInfoProfileImageComponent;
  let fixture: ComponentFixture<BlockInfoProfileImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BlockInfoProfileImageComponent,
        NgxPermissionsAllowStubDirective,
      ],
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

    fixture = TestBed.createComponent(BlockInfoProfileImageComponent);
    component = fixture.componentInstance;
    component.item = new Site();
    component.type = 'club';

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('type === artist', () => {
    component.type = 'artist';
    component.ngOnInit();
    expect(component.class).toEqual('rounded-full w-52');
  });

  it('type === club', () => {
    component.type = 'club';
    component.ngOnInit();
    expect(component.class).toEqual('rounded-2xl w-52');
  });

  it('type === event', () => {
    component.type = 'event';
    component.ngOnInit();
    expect(component.class).toEqual(
      'h-80 w-100 sm:w-64 mx-3 sm:mx-auto rounded-2xl'
    );
  });

  it('showImage', () => {
    const image = new Image();
    image.url = 'perro';
    component.showImage(image);
    expect(image).toBeDefined();
  });
});
