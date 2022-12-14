import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlockInfoProfileAddressComponent } from '@components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsAllowStubDirective,
  NgxPermissionsModule,
  NgxPermissionsService,
} from 'ngx-permissions';
import { Site } from '@models';
import { Router } from '@angular/router';
import { routerMock } from 'app/testing/services.mock';

describe('BlockInfoProfileAddressComponent', () => {
  let component: BlockInfoProfileAddressComponent;
  let fixture: ComponentFixture<BlockInfoProfileAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BlockInfoProfileAddressComponent,
        NgxPermissionsAllowStubDirective,
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [
        NgxPermissionsService,
        { provide: Router, useValue: routerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockInfoProfileAddressComponent);
    component = fixture.componentInstance;
    component.item = new Site();
    component.type = 'club';

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.goToFilter('style', 'Techno');
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
