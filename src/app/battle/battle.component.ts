import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { ShodownService } from "../shodownservice.service";
import { BattleStates } from "../battle-states";

@Component({
  selector: "battle",
  templateUrl: "./battle.component.html",
  styleUrls: ["./battle.component.css"]
})
export class BattleComponent implements OnInit {
  playerHeroes: Hero[];
  computerHeroes: Hero[];

  currentPlayerHero: Hero;
  currentComputerHero: Hero;

  isPlayerTurn: boolean;

  state: number;

  constructor(private shodown: ShodownService) {}

  ngOnInit() {
    this.playerHeroes = this.shodown.getPlayerHeroes();
    this.computerHeroes = this.shodown.getComputerHeroes();
    //temp just to test
    this.pickFirstPlayer();
    this.state = this.isPlayerTurn
      ? BattleStates.PLAYER_CHOOSE
      : BattleStates.CPU_CHOOSE;

    // while(this.currentPlayerHero.currentHealth > 0 && this.currentComputerHero.currentHealth > 0) {
    //   this.battle();
    // }

    while (
      (this.playerHeroes.length > 0 ||
        this.currentPlayerHero.currentHealth > 0) &&
      (this.computerHeroes.length > 0 ||
        this.currentComputerHero.currentHealth > 0)
    ) {
      switch (this.state) {
        case BattleStates.PLAYER_CHOOSE:
          this.pickPlayerHero();
          if (!this.currentComputerHero) {
            this.state = BattleStates.CPU_CHOOSE;
          } else {
            this.state = this.isPlayerTurn
              ? BattleStates.PLAYER_ATTACK
              : BattleStates.CPU_ATTACK;
          }
          break;
        case BattleStates.CPU_CHOOSE:
          this.pickComputerHero();
          if (!this.currentPlayerHero) {
            this.state = BattleStates.PLAYER_CHOOSE;
          } else {
            this.state = this.isPlayerTurn
              ? BattleStates.PLAYER_ATTACK
              : BattleStates.CPU_ATTACK;
          }
          break;
        case BattleStates.PLAYER_ATTACK:
        case BattleStates.CPU_ATTACK:
          this.battle();
          if (this.currentPlayerHero.currentHealth <= 0) {
            this.state = BattleStates.PLAYER_CHOOSE;
          } else if (this.currentComputerHero.currentHealth <= 0) {
            this.state = BattleStates.CPU_CHOOSE;
          } else {
            this.state = this.isPlayerTurn
              ? BattleStates.PLAYER_ATTACK
              : BattleStates.CPU_ATTACK;
          }
          break;
        default:
          console.log("bad state");
      }

      // if (this.currentPlayerHero.currentHealth <= 0) {
      //   let loser = this.currentPlayerHero;
      //   console.log(`${loser.hero} was defeated`);
      //   this.pickPlayerHero();
      // }
      // if (this.currentComputerHero.currentHealth <= 0) {
      //   let loser = this.currentComputerHero;
      //   console.log(`${loser.hero} was defeated`);
      //   this.pickComputerHero();
      // }
      // this.battle();
      // this.nextTurn();
    }
    let winner = this.playerHeroes.length > 0 ? this.shodown.getUsername() : "the computer";
    console.log(`The winner is ${winner}`);
  }

  pickFirstPlayer() {
    let random = this.random(0, 1);
    console.log(random);
    if (random === 0) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
    console.log(
      `The first player is ${
        this.isPlayerTurn ? this.shodown.getUsername() : "the computer"
      }`
    );
  }

  nextTurn() {
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  pickComputerHero() {
    if (this.currentComputerHero) {
      console.log(`${this.currentComputerHero.hero} was defeated`);
    }
    this.currentComputerHero = this.computerHeroes.splice(
      this.random(0, this.computerHeroes.length - 1),
      1
    )[0];
    this.currentComputerHero.currentHealth = this.currentComputerHero.health;
    console.log(`The computer selected ${this.currentComputerHero.hero}`);
  }

  //TODO make this into an event handler
  pickPlayerHero() {
    if (this.currentPlayerHero) {
      console.log(`${this.currentPlayerHero.hero} was defeated`);
    }
    this.currentPlayerHero = this.playerHeroes.splice(
      this.random(0, this.playerHeroes.length - 1),
      1
    )[0];
    this.currentPlayerHero.currentHealth = this.currentPlayerHero.health;
    console.log(
      `${this.shodown.getUsername()} selected ${this.currentPlayerHero.hero}`
    );
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
    this.nextTurn();
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
