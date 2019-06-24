import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Hero } from '../hero';
import { ShodownService } from '../shodownservice.service';
import { Router } from '@angular/router';
import { AttackType } from '../attack-type';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { AnimationDurations } from '../animation-durations';

@Component({
  selector: 'characterselection',
  templateUrl: './characterselection.component.html',
  styleUrls: ['./characterselection.component.css'],
  animations: [
    trigger('HeroSelect', [
      transition(":enter", [
        style({height: 0}),
        animate(`${AnimationDurations.heroSelect}ms`)
      ]),
      transition(":leave", [
        animate(`${AnimationDurations.heroSelect}ms`, style({height: 0}))
      ])
    ])
  ]
})
export class CharacterSelectionComponent implements OnInit {
  heroes: Hero[];
  selectedHeroes: Hero[] = [];

  attackTypes: AttackType[];

  maxHeroCount: number = 5;

  constructor(private apiService: ApiService, private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
    //return to homepage if we haven't gotten here normally
    if (!this.shodown.getUsername()) {
      this.router.navigate(["home"]);
      return;
    }

    this.apiService.getTypes().subscribe((response: AttackType[]) => {
      this.attackTypes = response;

      this.apiService.getHeroes().subscribe((response: any[]) => {
        this.heroes = [];
        for (let hero of response) {
          let heroToAdd: Hero = {
            id: hero.id,
            hero: hero.hero,
            health: hero.health,
            min_damage: hero.min_damage,
            max_damage: hero.max_damage,
            type: this.attackTypes.find(type => type.id === hero.attack_type_id)
          };
          if (hero.short_name) {
            heroToAdd.short_name = hero.short_name;
          }
          this.heroes.push(heroToAdd);
        }
      });
    })
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

  allHeroesPicked(): boolean {
    return this.selectedHeroes.length === this.maxHeroCount;
  }

  private moveHero(index: number, fromArray: Hero[], toArray: Hero[]) {
    toArray.push(fromArray[index]);
    fromArray.splice(index, 1);
  }

}
