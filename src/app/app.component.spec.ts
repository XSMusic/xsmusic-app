import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { AppComponent } from './app.component';
import { SwUpdate } from '@angular/service-worker';
import { MetaService } from '@services';
import { AuthService } from '@core/auth';
import { of } from 'rxjs';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { svgIconRegistryServiceMock } from './testing/services.mock';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NgxPermissionsAllowStubDirective],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [
        NgxPermissionsService,
        { provide: SwUpdate, useValue: {} },
        { provide: MetaService, useValue: { setMeta: () => {} } },
        { provide: AuthService, useValue: { user: () => of() } },
        {
          provide: SvgIconRegistryService,
          useValue: svgIconRegistryServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
