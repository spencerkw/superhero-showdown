import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ShodownService } from '../shodownservice.service';

@Component({
  selector: 'battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  playerHeroes: Hero[];
  computerHeroes: Hero[];

  currentPlayerHero: Hero;
  currentComputerHero: Hero;

  isPlayerTurn: boolean;

  constructor(private shodown: ShodownService) { }

  ngOnInit() {
    this.playerHeroes = this.shodown.getPlayerHeroes();
    this.computerHeroes = this.shodown.getComputerHeroes();
    //temp just to test
    this.pickFirstPlayer();
    this.pickComputerHero();
    this.pickPlayerHero();

    while(this.currentPlayerHero.currentHealth > 0 && this.currentComputerHero.currentHealth > 0) {
      this.battle();
    }
    let loser = this.currentPlayerHero.currentHealth > 0 ? this.currentComputerHero : this.currentPlayerHero;
    console.log(`${loser.hero} was defeated`);
  }

  pickFirstPlayer() {
    this.isPlayerTurn = (this.random(0, 1)) ? true : false;
    console.log(`The first player is ${this.isPlayerTurn ? this.shodown.getUsername() : "the computer"}`);
  }

  nextTurn() {
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  pickComputerHero() {
    this.currentComputerHero = this.computerHeroes.splice(this.random(0, this.computerHeroes.length - 1), 1)[0];
    this.currentComputerHero.currentHealth = this.currentComputerHero.health;
    console.log(`The computer selected ${this.currentComputerHero.hero}`);
  }

  //TODO make this into an event handler
  pickPlayerHero() {
    this.currentPlayerHero = this.playerHeroes.splice(this.random(0, this.playerHeroes.length - 1), 1)[0];
    this.currentPlayerHero.currentHealth = this.currentPlayerHero.health;
    console.log(`${this.shodown.getUsername()} selected ${this.currentPlayerHero.hero}`);
  }

  attack(attacker: Hero, target: Hero) {
    let damage = this.random(attacker.min_damage, attacker.max_damage);
    target.currentHealth -= damage;
    console.log(`${attacker.hero} dealt ${damage} to ${target.hero}`);
  }

  battle() {
    let attacker: Hero, target: Hero;
    if (this.isPlayerTurn) {
      attacker = this.currentPlayerHero;
      target = this.currentComputerHero;
    } else {
      attacker = this.currentComputerHero;
      target = this.currentPlayerHero;
    }

    this.attack(attacker, target);
    console.log(`${target.hero} has ${target.currentHealth} HP left`);
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
