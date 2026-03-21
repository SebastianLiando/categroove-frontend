import {Component, computed, input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-equalizer',
  imports: [
    NgStyle
  ],
  templateUrl: './equalizer.html',
  styleUrl: './equalizer.css',
  host: {
    class: 'flex flex-row items-end gap-x-1'
  }
})
export class Equalizer {
  barColor = input("teal")
  barCount = input(10)
  animationSpeed = input(1)

  bars = computed(() => Array.from({length: this.barCount()}, (_, index) => index))
  animationDelays = computed(() => Array.from({length: this.barCount()}, (_) => Math.random() * this.animationSpeed()))

  getStyleForBar(index: number): Partial<CSSStyleDeclaration> {
    const animationName = index % 2 == 0 ? 'shorteq' : 'talleq'
    const animationDelay = this.animationDelays()[index]

    return {
      background: this.barColor(),
      animationName: animationName,
      animationDelay: `${animationDelay}s`
    }
  }
}
