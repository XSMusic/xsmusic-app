import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { SocialInputsComponent } from '@components';
import { ScrapingService, UIService } from '@services';
import {
  scrapingServiceMock,
  svgIconRegistryServiceMock,
  uiServiceMock,
} from 'app/testing/services.mock';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { Artist } from '@models';

describe('SocialInputsComponent', () => {
  let component: SocialInputsComponent;
  let fixture: ComponentFixture<SocialInputsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SocialInputsComponent, NgxPermissionsAllowStubDirective],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [
        NgxPermissionsService,
        {
          provide: SvgIconRegistryService,
          useValue: svgIconRegistryServiceMock,
        },
        { provide: ScrapingService, useValue: scrapingServiceMock },
        { provide: UIService, useValue: uiServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialInputsComponent);
    component = fixture.componentInstance;
    component.item = new Artist();
    component.type = 'artist';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
