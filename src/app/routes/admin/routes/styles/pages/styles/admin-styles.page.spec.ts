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
import { AdminStylesPage } from './admin-styles.page';

describe('AdminStylesPage', () => {
  let component: AdminStylesPage;
  let fixture: ComponentFixture<AdminStylesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStylesPage, NgxPermissionsAllowStubDirective],
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
              queryParamMap: {
                get: () => '123',
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStylesPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
