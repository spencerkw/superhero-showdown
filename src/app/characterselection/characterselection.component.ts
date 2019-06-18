import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Hero } from '../hero';
import { ShodownService } from '../shodownservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'characterselection',
  templateUrl: './characterselection.component.html',
  styleUrls: ['./characterselection.component.css']
})
export class CharacterSelectionComponent implements OnInit {
  heroes: Hero[];
  selectedHeroes: Hero[] = [];

  maxHeroCount: number = 5;

  constructor(private apiService: ApiService, private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
    this.apiService.getHeroes().subscribe((response: Hero[]) => {
      this.heroes = response;
    });
  }

  selectHero(index: number) {
    if (this.selectedHeroes.length < 5) {
      this.moveHero(index, this.heroes, this.selectedHeroes);
    }
  }

  deselectHero(index: number) {
    this.moveHero(index, this.selectedHeroes, this.heroes);
  }

  submitSelection(): void {
    if (this.selectedHeroes.length < 5) {
      return;
    }

    this.shodown.setPlayerHeroes(this.selectedHeroes);

    let computerHeroes: Hero[] = [];
    for (let i = 0; i < this.maxHeroCount; i++) {
      this.moveHero(this.shodown.random(0, this.heroes.length - 1), this.heroes, computerHeroes);
    }
    this.shodown.setComputerHeroes(computerHeroes);

    // console.log(this.shodown.getPlayerHeroes());
    // console.log(this.shodown.getComputerHeroes());

    this.router.navigate(["shodown"]);
  }

  private moveHero(index: number, fromArray: Hero[], toArray: Hero[]) {
    toArray.push(fromArray[index]);
    fromArray.splice(index, 1);
  }

}
