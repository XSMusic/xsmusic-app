import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { SvgIconRegistryService } from 'angular-svg-icon';
import {
  apiServiceMock,
  scrapingServiceMock,
  svgIconRegistryServiceMock,
  uiServiceMock,
} from 'app/testing/services.mock';
import { ApiService, ScrapingService, UIService } from '@services';
import { AdminArtistOneComponent } from '@components';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminArtistOneComponent', () => {
  let component: AdminArtistOneComponent;
  let fixture: ComponentFixture<AdminArtistOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminArtistOneComponent, NgxPermissionsAllowStubDirective],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [
        NgxPermissionsService,
        {
          provide: SvgIconRegistryService,
          useValue: svgIconRegistryServiceMock,
        },
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
        {
          provide: UIService,
          useValue: uiServiceMock,
        },
        {
          provide: ScrapingService,
          useValue: scrapingServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminArtistOneComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showInfo', () => {
    component.showInfo('prueba');
    expect(uiServiceMock).toBeDefined();
  });

  it('selectInfo', () => {
    component.selectInfo('prueba');
    expect(component.artist.info).toEqual('prueba');
  });
});
