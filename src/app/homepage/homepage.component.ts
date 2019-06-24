import { Component, OnInit } from '@angular/core';
import { ShodownService } from '../shodownservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
  }

  submitName(name: string): void {
    console.log(name);
    if (name) {
      this.shodown.setUsername(name);
      this.router.navigate(["hero-select"]);
    }
  }

}
