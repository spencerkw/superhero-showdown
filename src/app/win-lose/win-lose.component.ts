import { Component, OnInit } from '@angular/core';
import { ShodownService } from "../shodownservice.service";
import { isUndefined } from 'util';
import { Router } from '@angular/router';
import { HttpBackend } from '@angular/common/http';


@Component({
  selector: 'app-win-lose',
  templateUrl: './win-lose.component.html',
  styleUrls: ['./win-lose.component.css']
})
export class WinLoseComponent implements OnInit {
  show: boolean = true
  heavenImage: string = 'url(../../assets/images/heaven.jpg)';
  hellImage: string = 'url(../../assets/images/helldefeat.jpg)';

  constructor(private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
    if (isUndefined(this.shodown.getVictory())) {
      this.router.navigate(["home"]);
    }
  }

  getImage() {
    if (this.shodown.getVictory) {
      return this.heavenImage;

    } else {return this.hellImage}
  }
  winner() {
    if (this.shodown.getVictory()) {
      return this.shodown.getUsername()
    } else {
      return "the computer"
    };
  }

  // loser() {
  //   if (this.shodown.getDefeat()) {
  //     if (true) {
  //       return "the computer"
  //     };
  //   }
  // }
  playAgain(): void {
    this.router.navigate(["home"]);
  }

}
