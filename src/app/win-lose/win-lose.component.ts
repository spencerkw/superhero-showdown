import { Component, OnInit } from '@angular/core';
import { ShodownService } from "../shodownservice.service";
import { isUndefined } from 'util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-win-lose',
  templateUrl: './win-lose.component.html',
  styleUrls: ['./win-lose.component.css']
})
export class WinLoseComponent implements OnInit {

  constructor(private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
    if (isUndefined(this.shodown.getVictory())) {
      this.router.navigate(["home"]);
      return;
    }
  }

  winner() {
    if (this.shodown.getVictory()) {
      return this.shodown.getUsername();
    } else {
      return "the computer"
    };
  }

}
