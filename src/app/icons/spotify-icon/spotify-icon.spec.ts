import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyIcon } from './spotify-icon';

describe('SpotifyIcon', () => {
  let component: SpotifyIcon;
  let fixture: ComponentFixture<SpotifyIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
