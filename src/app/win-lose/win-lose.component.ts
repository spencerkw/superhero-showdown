import { Component, OnInit } from '@angular/core';
import { ShodownService } from "../shodownservice.service";
import { isNull } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'win-lose',
  templateUrl: './win-lose.component.html',
  styleUrls: ['./win-lose.component.css']
})
export class WinLoseComponent implements OnInit {
  victory: boolean;

  constructor(private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
    if (isNull(this.shodown.getVictory())) {
      this.router.navigate(["home"]);
      return;
    }

    this.victory = this.shodown.getVictory();
  }

  message(): string {
    if (this.victory) {
      return `${this.shodown.getUsername()} was victorious!`;
    } else {
      return `${this.shodown.getUsername()} was defeated.`;
    }
  }

  playAgain(): void {
    this.shodown.clearData();
    this.router.navigate(["home"]);
  }

  // winner() {
  //   if (this.shodown.getVictory()) {
  //     return this.shodown.getUsername()
  //   } else {
  //     return "the computer"
  //   };
  // }
}
