import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { SearchInputComponent } from '@components';
import { ApiService, UIService } from '@services';
import {
  apiServiceMock,
  svgIconRegistryServiceMock,
  uiServiceMock,
} from 'app/testing/services.mock';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { Artist, Site, Style } from '@models';
import { of } from 'rxjs';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent, NgxPermissionsAllowStubDirective],
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
        { provide: ApiService, useValue: apiServiceMock },
        { provide: UIService, useValue: uiServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    component.item = new Artist();
    component.type = 'artist';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setInfo', () => {
    it('type ===  artist', () => {
      component.type = 'artist';
      component.item = new Artist();
      component.setInfo();
      expect(component.label).toEqual('Artista/s');
      expect(component.placeholder).toEqual('Introduce el artista');
    });
    it('type === site', () => {
      component.type = 'site';
      component.item = new Site();
      component.setInfo();
      expect(component.label).toEqual('Club/Festival');
      expect(component.placeholder).toEqual('Introduce el club o festival');
    });
    it('type === style', () => {
      component.type = 'style';
      component.item = new Style();
      component.setInfo();
      expect(component.label).toEqual('Estilo/s');
      expect(component.placeholder).toEqual('Introduce el estilo');
    });
  });

  it('closeSelection', () => {
    component.closeSelection();
    expect(component.selectState).toEqual(false);
  });

  describe('onChangeInput', () => {
    it('none', () => {
      component.item.artists = [];
      apiServiceMock.getAll = () => of([new Artist()]);
      component.onChangeInput('');
      expect(component.item.artists.length).toEqual(0);
    });

    it('artist', () => {
      component.item.artists = [];
      apiServiceMock.getAll = () => of([new Artist()]);
      component.onChangeInput('prueba');
      expect(component.item.artists.length).toEqual(1);
    });

    it('site', () => {
      component.type = 'site';
      component.item.site = new Site();
      apiServiceMock.getAll = () => of([new Site()]);
      component.onChangeInput('prueba');
      expect(component.item.site).toBeDefined();
    });

    it('style', () => {
      component.type = 'style';
      component.item.styles = [];
      apiServiceMock.getAll = () => of([new Style()]);
      component.onChangeInput('prueba');
      expect(component.item.styles.length).toEqual(1);
    });

    it('style', () => {
      component.type = 'style';
      component.item.styles = [];
      apiServiceMock.getAll = () => of([new Style(), new Style()]);
      component.onChangeInput('prueba');
      expect(component.itemsSearch.length).toEqual(2);
    });
  });

  describe('onClickItem', () => {
    it('artist', () => {
      component.type = 'artist';
      const artist = new Artist({ _id: '1', name: 'prueba' });
      component.item.artists = [artist];
      component.onClickItem({ name: 'prueba', _id: '1' });
      expect(component.item.artists.length).toEqual(0);
    });
    it('style', () => {
      component.type = 'style';
      const style = new Style({ _id: '1', name: 'prueba' });
      component.item.styles = [style];
      component.onClickItem({ name: 'prueba', _id: '1' });
      expect(component.item.styles.length).toEqual(0);
    });
    it('site', () => {
      spyOn(component, 'onChangeInput');
      component.type = 'site';
      component.onClickItem({ name: 'prueba', _id: '1' });
      expect(component.onChangeInput).toHaveBeenCalled();
    });
  });
});
