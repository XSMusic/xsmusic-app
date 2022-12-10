import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ImagesViewListComponent } from '@components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';

describe('ImagesViewListComponent', () => {
  let component: ImagesViewListComponent;
  let fixture: ComponentFixture<ImagesViewListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesViewListComponent, NgxPermissionsAllowStubDirective],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [NgxPermissionsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesViewListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
