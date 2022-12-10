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
      providers: [NgxPermissionsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LastMultiItemsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
