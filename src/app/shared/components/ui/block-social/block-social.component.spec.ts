import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlockSocialComponent } from '@components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { Artist } from '@models';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { gaServiceMock } from 'app/testing/services.mock';

describe('BlockSocialComponent', () => {
  let component: BlockSocialComponent;
  let fixture: ComponentFixture<BlockSocialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BlockSocialComponent, NgxPermissionsAllowStubDirective],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [
        NgxPermissionsService,
        {
          provide: GoogleAnalyticsService,
          useValue: gaServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockSocialComponent);
    component = fixture.componentInstance;
    component.item = new Artist();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToSocial', () => {
    component.goToSocial('artist', 'link');
    expect(gaServiceMock.event).toHaveBeenCalled();
  });
});
