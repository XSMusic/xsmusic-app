import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistBlockTracksComponent } from './artist-block-tracks.component';

describe('ArtistBlockTracksComponent', () => {
  let component: ArtistBlockTracksComponent;
  let fixture: ComponentFixture<ArtistBlockTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistBlockTracksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistBlockTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
