import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlockStatsComponent } from '@components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';

describe('BlockStatsComponent', () => {
  let component: BlockStatsComponent;
  let fixture: ComponentFixture<BlockStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BlockStatsComponent, NgxPermissionsAllowStubDirective],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [NgxPermissionsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockStatsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('title -> topCountries', () => {
      component.type = 'topCountries';
      component.ngOnInit();
      expect(component.title).toEqual('Top Paises');
    });

    it('title -> topSocial', () => {
      component.type = 'topSocial';
      component.ngOnInit();
      expect(component.title).toEqual('Top Redes sociales');
    });

    it('title -> topStyles', () => {
      component.type = 'topStyles';
      component.ngOnInit();
      expect(component.title).toEqual('Top Estilos');
    });
  });
});
