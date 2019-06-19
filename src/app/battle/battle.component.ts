import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { ShodownService } from "../shodownservice.service";
import { BattleStates } from "../battle-states";
import { Router } from '@angular/router';

@Component({
  selector: "battle",
  templateUrl: "./battle.component.html",
  styleUrls: ["./battle.component.css"]
})
export class BattleComponent implements OnInit {
  playerHeroes: Hero[];
  computerHeroes: Hero[];

  playerInputNeeded: boolean = false;

  constructor(private shodown: ShodownService, private router: Router) {}

  ngOnInit() {
    this.playerHeroes = this.shodown.getPlayerHeroes();
    this.computerHeroes = this.shodown.getComputerHeroes();
    //temp just to test
    this.shodown.pickFirstPlayer();
    this.shodown.setBattleState(this.shodown.getIsPlayerTurn()
      ? BattleStates.PLAYER_CHOOSE
      : BattleStates.CPU_CHOOSE);

    // this.shodown.pickComputerHero();
    // this.shodown.pickPlayerHero();

    this.battleLoop();

    // let winner = this.playerHeroes.length > 0 ? this.shodown.getUsername() : "the computer";
    // console.log(`The winner is ${winner}`);
  }

  battleLoop(): void {
    while (
      !this.playerInputNeeded && !this.shodown.checkWinner()
      // (this.playerHeroes.length > 0 ||
      //   (this.shodown.getCurrentPlayerHero() &&
      //     this.shodown.getCurrentPlayerHero().currentHealth > 0)) &&
      // (this.computerHeroes.length > 0 ||
      //   (this.shodown.getCurrentComputerHero() &&
      //     this.shodown.getCurrentComputerHero().currentHealth > 0))
    ) {
      switch (this.shodown.getBattleState()) {
        case BattleStates.PLAYER_CHOOSE:
          // this.shodown.pickPlayerHero();
          this.playerInputNeeded = true;
          break;
        case BattleStates.CPU_CHOOSE:
          this.shodown.pickComputerHero();
          break;
        case BattleStates.PLAYER_ATTACK:
        case BattleStates.CPU_ATTACK:
          this.shodown.battle();
          break;
        // case BattleStates.END_GAME:
        //   this.gameOver();
        //   break;
        default:
          console.log("bad state");
      }

      this.shodown.updateBattleState();
      this.shodown.removeDead();
      
      if (this.shodown.checkWinner()) {
        // console.log("winner found");
        this.shodown.setBattleState(BattleStates.END_GAME);
      }
    }

    if (this.shodown.getBattleState() === BattleStates.END_GAME) {
      this.gameOver();
    }
  }

  choosePlayerCard(index: number): void {
    this.playerInputNeeded = false;
    this.shodown.pickPlayerHero(index);
    this.battleLoop();
  }

  gameOver(): void {
    console.log(`The winner is ${this.shodown.getVictory() ? this.shodown.getUsername() : "the computer"}`);
    this.router.navigate(["endgame"]);
  }

  currentComputerHero(): Hero {
    return this.shodown.getCurrentComputerHero();
  }

  currentPlayerHero(): Hero {
    return this.shodown.getCurrentPlayerHero();
  }
}
