import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equalizer } from './equalizer';

describe('Equalizer', () => {
  let component: Equalizer;
  let fixture: ComponentFixture<Equalizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equalizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Equalizer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of bars', async () => {
    fixture.componentRef.setInput('barCount', 100)
    await fixture.whenStable()

    let bars = fixture.nativeElement.querySelectorAll(".eq")
    expect(bars).toHaveLength(100);

    fixture.componentRef.setInput('barCount', 10);
    await fixture.whenStable()

    bars = fixture.nativeElement.querySelectorAll('.eq');
    expect(bars).toHaveLength(10);
  })
});
