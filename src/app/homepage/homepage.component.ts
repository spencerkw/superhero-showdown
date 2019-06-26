import { Component, OnInit } from '@angular/core';
import { ShodownService } from '../shodownservice.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  backstoryFormShowing: boolean = false;


  constructor(private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
  }

  submitName(name: string): void {
    if (!environment.production) {
      console.log(name);
    }
    
    if (name) {
      this.shodown.setUsername(name);
      this.router.navigate(["hero-select"]);
    }
  }

  toggleForm(): void {
    this.backstoryFormShowing = !this.backstoryFormShowing;
  }

}
