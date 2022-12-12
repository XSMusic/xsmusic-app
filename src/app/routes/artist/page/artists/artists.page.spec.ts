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
  artistServiceMock,
  eventServiceMock,
  mediaServiceMock,
  siteServiceMock,
  svgIconRegistryServiceMock,
} from 'app/testing/services.mock';
import { ArtistsPage } from './artists.page';
import { ActivatedRoute } from '@angular/router';
import {
  ArtistService,
  EventService,
  MediaService,
  SiteService,
} from '@services';

describe('ArtistsPage', () => {
  let component: ArtistsPage;
  let fixture: ComponentFixture<ArtistsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistsPage, NgxPermissionsAllowStubDirective],
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
          provide: ArtistService,
          useValue: artistServiceMock,
        },
        {
          provide: SiteService,
          useValue: siteServiceMock,
        },
        {
          provide: EventService,
          useValue: eventServiceMock,
        },
        {
          provide: MediaService,
          useValue: mediaServiceMock,
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

    fixture = TestBed.createComponent(ArtistsPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
