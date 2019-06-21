import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { BattleStates } from './battle-states.enum';
import { Attack } from './attack';

@Injectable({
  providedIn: 'root'
})
export class ShodownService {

  private username: string;
  private playerHeroes: Hero[];
  private computerHeroes: Hero[];

  private currentPlayerHero: Hero;
  private currentComputerHero: Hero;

  private isPlayerTurn: boolean;

  private state: number;

  private victory: boolean;
  private currentAttack: Attack;

  private attackAnimations: string[] = ["bump", "kick", "punch"];
  private currentAttackAnimation: string = "";

  constructor() { }

  getUsername(): string {
    return this.username;
  }

  getPlayerHeroes(): Hero[] {
    return this.playerHeroes;
  }

  getComputerHeroes(): Hero[] {
    return this.computerHeroes;
  }

  getCurrentPlayerHero(): Hero {
    return this.currentPlayerHero;
  }

  getCurrentComputerHero(): Hero {
    return this.currentComputerHero;
  }

  getIsPlayerTurn(): boolean {
    return this.isPlayerTurn;
  }

  getBattleState(): number {
    return this.state;
  }

  getVictory(): boolean {
    return this.victory;
  }

  getCurrentAttack(): Attack {
    return this.currentAttack;
  }

  getCurrentAttackAnimation(): string {
    return this.currentAttackAnimation;
  }

  setUsername(name: string): void {
    this.username = name;
  }

  setPlayerHeroes(heroes: Hero[]): void {
    this.playerHeroes = heroes;
  }

  setComputerHeroes(heroes: Hero[]): void {
    this.computerHeroes = heroes;
  }

  setCurrentPlayerHero(hero: Hero): void {
    this.currentPlayerHero = hero;
  }

  setCurrentComputerHero(hero: Hero): void {
    this.currentComputerHero = hero;
  }

  setIsPlayerTurn(turn: boolean): void {
    this.isPlayerTurn = turn;
  }

  setBattleState(state: number): void {
    this.state = state;
  }

  updateBattleState(): void {
    switch (this.state) {
      case BattleStates.PLAYER_CHOOSE:
        if (!this.currentComputerHero) {
          this.state = BattleStates.CPU_CHOOSE;
        } else {
          this.state = this.isPlayerTurn
            ? BattleStates.PLAYER_ATTACK
            : BattleStates.CPU_ATTACK;
        }
        break;
      case BattleStates.CPU_CHOOSE:
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
    }
  }

  nextTurn(): void {
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  pickFirstPlayer(): void {
    let random = this.random(0, 1);
    console.log(random);
    if (random === 0) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
    console.log(
      `The first player is ${
      this.isPlayerTurn ? this.username : "the computer"
      }`
    );
  }

  pickComputerHero = (): void => {
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
  pickPlayerHero(index: number): void {
    if (this.currentPlayerHero) {
      console.log(`${this.currentPlayerHero.hero} was defeated`);
    }
    this.currentPlayerHero = this.playerHeroes.splice(index, 1)[0];
    this.currentPlayerHero.currentHealth = this.currentPlayerHero.health;
    console.log(
      `${this.username} selected ${this.currentPlayerHero.hero}`
    );
  }

  attack(attacker: Hero, target: Hero) {
    let damage = this.random(attacker.min_damage, attacker.max_damage);

    if (attacker.type.type === target.type.weak_against) {
      damage *= 1.5;
      console.log(`${attacker.hero} has type advantage over ${target.hero}`);
    }

    damage = Math.floor(damage);
    target.currentHealth -= damage;

    console.log(`${attacker.hero} dealt ${damage} to ${target.hero}`);

    this.pickAttackAnimation();
    this.currentAttack = {
      attacker: attacker,
      target: target,
      damage: damage,
      attackType: attacker.type
    };
  }

  battle = (): void => {
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

  removeDead(): boolean {
    if (this.currentComputerHero && this.currentComputerHero.currentHealth <= 0) {
      this.currentComputerHero = null;
      return true;
    } else if (this.currentPlayerHero && this.currentPlayerHero.currentHealth <= 0) {
      this.currentPlayerHero = null;
      return true;
    }

    return false;
  }

  checkWinner(): boolean {
    // console.log("checking winner");
    if (this.computerHeroes.length === 0 && !this.currentComputerHero) {
      this.victory = true;
      return true;
    } else if (this.playerHeroes.length === 0 && !this.currentPlayerHero) {
      this.victory = false;
      return true;
    }

    return false;
  }

  pickAttackAnimation(): void {
    this.currentAttackAnimation = this.attackAnimations[this.random(0, 2)];
  }

  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
