import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArtistBlockSetsComponent } from './artist-block-sets.component';

describe('ArtistBlockSetsComponent', () => {
  let component: ArtistBlockSetsComponent;
  let fixture: ComponentFixture<ArtistBlockSetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistBlockSetsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistBlockSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
