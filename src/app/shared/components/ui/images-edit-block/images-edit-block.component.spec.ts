import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ImagesEditBlockComponent } from '@components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { svgIconRegistryServiceMock } from 'app/testing/services.mock';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { Artist } from '@models';

describe('ImagesEditBlockComponent', () => {
  let component: ImagesEditBlockComponent;
  let fixture: ComponentFixture<ImagesEditBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImagesEditBlockComponent,
        NgxPermissionsAllowStubDirective,
      ],
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
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesEditBlockComponent);
    component = fixture.componentInstance;
    component.item = new Artist();
    component.item.images = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
