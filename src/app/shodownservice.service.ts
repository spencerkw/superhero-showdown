import { Injectable } from '@angular/core';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class ShodownService {

  private username: string;
  private playerHeroes: Hero[];
  private computerHeroes: Hero[];

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

  setUsername(name: string): void {
    this.username = name;
  }

  setPlayerHeroes(heroes: Hero[]): void {
    this.playerHeroes = heroes;
  }

  setComputerHeroes(heroes: Hero[]): void {
    this.computerHeroes = heroes;
  }

}
