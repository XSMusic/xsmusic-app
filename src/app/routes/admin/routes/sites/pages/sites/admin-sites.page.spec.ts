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
  imageServiceMock,
  scrapingServiceMock,
  statsServiceMock,
  svgIconRegistryServiceMock,
} from 'app/testing/services.mock';
import { ActivatedRoute } from '@angular/router';
import {
  ApiService,
  ImageService,
  ScrapingService,
  StatsService,
} from '@services';
import { AdminSitesPage } from './admin-sites.page';

describe('AdminSitesPage', () => {
  let component: AdminSitesPage;
  let fixture: ComponentFixture<AdminSitesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSitesPage, NgxPermissionsAllowStubDirective],
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
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
        {
          provide: StatsService,
          useValue: statsServiceMock,
        },
        {
          provide: ScrapingService,
          useValue: scrapingServiceMock,
        },
        {
          provide: ImageService,
          useValue: imageServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              routeConfig: { path: 'sets' },
              queryParams: {
                source: '123',
                value: '123',
                tab: 'viewList',
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSitesPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
