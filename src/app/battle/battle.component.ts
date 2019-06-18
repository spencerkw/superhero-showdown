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

  constructor(private shodown: ShodownService) {}

  ngOnInit() {
    this.playerHeroes = this.shodown.getPlayerHeroes();
    this.computerHeroes = this.shodown.getComputerHeroes();
    //temp just to test
    this.shodown.pickFirstPlayer();
    this.shodown.setBattleState(this.shodown.getIsPlayerTurn()
      ? BattleStates.PLAYER_CHOOSE
      : BattleStates.CPU_CHOOSE);

    this.shodown.pickComputerHero();
    this.shodown.pickPlayerHero();

    // while (
    //   (this.playerHeroes.length > 0 ||
    //     this.shodown.getCurrentPlayerHero().currentHealth > 0) &&
    //   (this.computerHeroes.length > 0 ||
    //     this.shodown.getCurrentComputerHero().currentHealth > 0)
    // ) {
    //   switch (this.shodown.getBattleState()) {
    //     case BattleStates.PLAYER_CHOOSE:
    //       this.shodown.pickPlayerHero();
    //       break;
    //     case BattleStates.CPU_CHOOSE:
    //       this.shodown.pickComputerHero();
    //       break;
    //     case BattleStates.PLAYER_ATTACK:
    //     case BattleStates.CPU_ATTACK:
    //       this.shodown.battle();
    //       break;
    //     default:
    //       console.log("bad state");
    //   }

    //   this.shodown.updateBattleState();
    // }
    // let winner = this.playerHeroes.length > 0 ? this.shodown.getUsername() : "the computer";
    // console.log(`The winner is ${winner}`);
  }

  currentComputerHero(): Hero {
    return this.shodown.getCurrentComputerHero();
  }

  currentPlayerHero(): Hero {
    return this.shodown.getCurrentPlayerHero();
  }
}
