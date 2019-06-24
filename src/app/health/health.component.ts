import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { AnimationDurations } from '../animation-durations';

@Component({
  selector: 'health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css'],
  animations: [
    trigger('LostHealth', [
      state('false', style({ opacity: 0 })),
      transition("* => false", [
        animate(`${AnimationDurations.healthLost}ms`, keyframes([
          style({ transform: 'rotate(360deg) scale(0)' })
        ]))
      ])
    ])
  ]
})
export class HealthComponent implements OnInit {

  @Input() name: string;
  @Input() health: number;

  constructor() { }

  ngOnInit() {
  }

  heartIsShowing(i: number): boolean {
    if (this.health >= i) {
      return true;
    }
    return false;
  }

}
