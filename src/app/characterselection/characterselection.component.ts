import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'characterselection',
  templateUrl: './characterselection.component.html',
  styleUrls: ['./characterselection.component.css']
})
export class CharacterSelectionComponent implements OnInit {
  heroes: any;
  selectedHeroes: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getHeroes().subscribe(response => {
      this.heroes=response;
    });
  }

  selectHero(index: number) {
    this.selectedHeroes.push(this.heroes[index]);
    this.heroes.splice(index, 1);
  }

}
