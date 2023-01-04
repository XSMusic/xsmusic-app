import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { GenericAdminListBase } from '@components';
import {
  ApiService,
  ImageService,
  ScrapingService,
  StatsService,
  UIService,
} from '@services';
import {
  apiServiceMock,
  imageServiceMock,
  scrapingServiceMock,
  statsServiceMock,
  svgIconRegistryServiceMock,
  uiServiceMock,
} from 'app/testing/services.mock';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { ActivatedRoute } from '@angular/router';

describe('GenericAdminListBase', () => {
  let component: GenericAdminListBase;
  let fixture: ComponentFixture<GenericAdminListBase>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GenericAdminListBase, NgxPermissionsAllowStubDirective],
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
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                source: '123',
                value: '123',
              },
            },
          },
        },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: StatsService, useValue: statsServiceMock },
        { provide: ScrapingService, useValue: scrapingServiceMock },
        { provide: ImageService, useValue: imageServiceMock },
        { provide: UIService, useValue: uiServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericAdminListBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('artist', () => {
      component.type = 'artist';
      component.ngOnInit();
      expect(component.vm.title).toEqual('Artistas');
      expect(component.vm.typeTabs).toEqual('artistsAdmin');
      expect(component.vm.typeItems).toEqual('artists');
      expect(component.vm.typeBody).toEqual('bodyArtist');
      expect(component.vm.apiType).toEqual('artists');
      expect(component.vm.stats).toBeDefined();
    });

    it('event', () => {
      component.type = 'event';
      component.ngOnInit();
      expect(component.vm.title).toEqual('Eventos');
      expect(component.vm.typeTabs).toEqual('eventsAdmin');
      expect(component.vm.typeItems).toEqual('events');
      expect(component.vm.typeBody).toEqual('bodyEvent');
      expect(component.vm.apiType).toEqual('events');
      expect(component.vm.stats).toBeDefined();
    });

    it('image', () => {
      component.type = 'image';
      component.ngOnInit();
      expect(component.vm.title).toEqual('Imagenes');
      expect(component.vm.typeTabs).toEqual('imagesAdmin');
      expect(component.vm.typeItems).toEqual('images');
      expect(component.vm.typeBody).toEqual('bodyImage');
      expect(component.vm.apiType).toEqual('images');
    });

    it('like', () => {
      component.type = 'like';
      component.ngOnInit();
      expect(component.vm.title).toEqual('Likes');
      expect(component.vm.typeTabs).toEqual('likesAdmin');
      expect(component.vm.typeItems).toEqual('likes');
      expect(component.vm.typeBody).toEqual('bodyLike');
      expect(component.vm.apiType).toEqual('likes');
    });

    it('media -> set', () => {
      component.type = 'media';
      component.subType = 'set';
      component.ngOnInit();
      expect(component.vm.title).toEqual('Sets');
      expect(component.vm.typeTabs).toEqual('mediasAdmin');
      expect(component.vm.typeItems).toEqual('medias');
      expect(component.vm.typeBody).toEqual('bodyMedia');
      expect(component.vm.apiType).toEqual('media');
    });

    it('media -> track', () => {
      component.type = 'media';
      component.subType = 'track';
      component.ngOnInit();
      expect(component.vm.title).toEqual('Tracks');
      expect(component.vm.typeTabs).toEqual('mediasAdmin');
      expect(component.vm.typeItems).toEqual('medias');
      expect(component.vm.typeBody).toEqual('bodyMedia');
      expect(component.vm.apiType).toEqual('media');
    });

    it('site -> club', () => {
      component.type = 'site';
      component.subType = 'club';
      component.ngOnInit();
      expect(component.vm.title).toEqual('Clubs');
      expect(component.vm.typeTabs).toEqual('sitesAdmin');
      expect(component.vm.typeItems).toEqual('sites');
      expect(component.vm.typeBody).toEqual('bodySite');
      expect(component.vm.apiType).toEqual('sites');
      expect(component.vm.bodySite.type).toEqual('club');
      expect(component.vm.stats).toBeDefined();
    });

    it('site -> festival', () => {
      component.type = 'site';
      component.subType = 'festival';
      component.ngOnInit();
      expect(component.vm.title).toEqual('Festivales');
      expect(component.vm.typeTabs).toEqual('sitesAdmin');
      expect(component.vm.typeItems).toEqual('sites');
      expect(component.vm.typeBody).toEqual('bodySite');
      expect(component.vm.apiType).toEqual('sites');
      expect(component.vm.bodySite.type).toEqual('festival');
      expect(component.vm.stats).toBeDefined();
    });
  });
});
