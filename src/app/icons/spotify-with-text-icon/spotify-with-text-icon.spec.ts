import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyWithTextIcon } from './spotify-with-text-icon';

describe('SpotifyWithTextIcon', () => {
  let component: SpotifyWithTextIcon;
  let fixture: ComponentFixture<SpotifyWithTextIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyWithTextIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyWithTextIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
