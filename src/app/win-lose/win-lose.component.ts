import { Component, OnInit } from '@angular/core';
import { ShodownService } from "../shodownservice.service";


@Component({
  selector: 'app-win-lose',
  templateUrl: './win-lose.component.html',
  styleUrls: ['./win-lose.component.css']
})
export class WinLoseComponent implements OnInit {

  constructor(private shodown: ShodownService) { }

  ngOnInit() {
  }

winner() {
  if (this.shodown.getVictory()) {
    if (true) {
      return this.shodown.getUsername()
    };
  } else {
    return "the computer"
  };
}

}
