import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { ShodownService } from "../shodownservice.service";
import { BattleStates } from "../battle-states.enum";
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Attack } from '../attack';
import { AnimationDurations } from '../animation-durations';

@Component({
  selector: "battle",
  templateUrl: "./battle.component.html",
  styleUrls: ["./battle.component.css"],
  animations: [
    trigger('PlayUserCard', [
      // state('onDeck', style({transform: 'translate(-100%, 175%)'})),
      // state('inPlay', style({transform: '*'})),
      transition(':enter', [
        style({ transform: 'translate(-90%, 90%)' }),
        animate(`${AnimationDurations.playCard}ms ease-out`, style({ transform: '*' }))
      ])
    ]),
    trigger('PlayComputerCard', [
      // state('onDeck', style({transform: 'translate(-100%, 175%)'})),
      // state('inPlay', style({transform: '*'})),
      transition(':enter', [
        style({ transform: 'translate(90%, -90%)' }),
        animate(`${AnimationDurations.playCard}ms ease-out`, style({ transform: '*' }))
      ])
    ]),
    trigger('UserAttack', [
      transition('none => bump', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(-40%)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ]),
      transition('none => punch', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(-40%) rotate(-15deg)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ]),
      transition('none => kick', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(-40%) rotate(15deg)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ])
    ]
    ),
    trigger('ComputerAttack', [
      transition('none => bump', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(40%)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ]),
      transition('none => punch', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(40%) rotate(15deg)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ]),
      transition('none => kick', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(40%) rotate(-15deg)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ])
    ]
    ),
    trigger('UserDeath', [
      transition('* => kick', [
        animate(`${AnimationDurations.death}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
          style({ transform: 'translateX(150%) translateY(-45%)  rotateY(90deg) rotateZ(90deg)', offset: 0.25 }),
          style({ transform: 'translateX(325%) translateY(-75%) rotateY(180deg) rotateZ(180deg)', offset: 0.50 }),
          style({ transform: 'translateX(450%) translateY(-125%) rotateY(90deg) rotateZ(90deg)', opacity: 0.5, offset: .75 }),
          style({ transform: 'translateX(500%) translateY(-135%) rotateY(180deg) rotateZ(180deg)', opacity: 0, offset: 1.0 })
        ]))
      ])
    ]),
    trigger('ComputerDeath', [
      transition('* => kick', [
        animate(`${AnimationDurations.death}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
          style({ transform: 'translateX(-150%) translateY(-45%)  rotateY(-90deg) rotateZ(-90deg)', offset: 0.25 }),
          style({ transform: 'translateX(-325%) translateY(-75%) rotateY(-180deg) rotateZ(-180deg)', offset: 0.50 }),
          style({ transform: 'translateX(-450%) translateY(-125%) rotateY(-90deg) rotateZ(-90deg)', opacity: 0.5, offset: .75 }),
          style({ transform: 'translateX(-500%) translateY(-135%) rotateY(-180deg) rotateZ(-180deg)', opacity: 0, offset: 1.0 })
        ]))
      ])
    ]),
    trigger('Pow', [
      transition('* => computer', [
        style({ display: 'block', left: '7.5%' }),
        animate(`${AnimationDurations.hitEffect}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateY(-25%) scale(1.5)', opacity: 0 })
        ]))
      ]),
      transition('* => player', [
        style({ display: 'block', right: '7.5%' }),
        animate(`${AnimationDurations.hitEffect}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateY(-25%) scale(1.5)', opacity: 0 })
        ]))
      ])
    ]),
    trigger('DamageDealt', [
      transition('* => computer', [
        style({ display: 'block' }),
        animate(`${AnimationDurations.hitEffect}ms`, keyframes([
          style({ transform: 'translateY(-25%)', opacity: 0 })
        ]))
      ]),
      transition('* => player', [
        style({ display: 'block' }),
        animate(`${AnimationDurations.hitEffect}ms`, keyframes([
          style({ transform: 'translateY(-25%)', opacity: 0 })
        ]))
      ])
    ])
  ]
})

export class BattleComponent implements OnInit {
  playerHeroes: Hero[];
  computerHeroes: Hero[];

  playerInputNeeded: boolean = false;
  lastActionDelay: number = 0;

  constructor(private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
    this.playerHeroes = this.shodown.getPlayerHeroes();
    this.computerHeroes = this.shodown.getComputerHeroes();

    if (!this.playerHeroes || !this.computerHeroes) {
      this.router.navigate(["home"]);
      return;
    }

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
    if (!this.playerInputNeeded) {

      let functionToRun = null; //this is what will be run in this step
      let delay = this.lastActionDelay; //set the delay for this step based on the last action's required delay

      switch (this.shodown.getBattleState()) {
        case BattleStates.PLAYER_CHOOSE:
          // this.shodown.pickPlayerHero();
          functionToRun = (): void => {
            this.playerInputNeeded = true;
          }
          this.lastActionDelay = AnimationDurations.playCard;
          delay -= 1000; //reduces the lag time for the player to be able to click
          break;
        case BattleStates.CPU_CHOOSE:
          functionToRun = this.shodown.pickComputerHero;
          this.lastActionDelay = AnimationDurations.playCard;
          break;
        case BattleStates.PLAYER_ATTACK:
        case BattleStates.CPU_ATTACK:
          functionToRun = this.shodown.battle;
          this.lastActionDelay = AnimationDurations.attack;
          break;
        // case BattleStates.END_GAME:
        //   functionToRun = this.gameOver();
        default:
          console.log("bad state");
      }

      //run the rest of the steps on a delay
      setTimeout((): void => {
        if (this.shodown.checkWinner()) {
          this.gameOver();
          // setTimeout(this.gameOver, delay);
          return;
        }
        functionToRun();
        this.shodown.updateBattleState();
        if (this.shodown.removeDead()) {
          this.lastActionDelay += AnimationDurations.death;
        }

        if (!this.playerInputNeeded) {
          this.battleLoop();
        }
      }, delay);

      // this.shodown.updateBattleState();
      // this.shodown.removeDead();

      // if (this.shodown.checkWinner()) {
      //   // console.log("winner found");
      //   this.shodown.setBattleState(BattleStates.END_GAME);
      // }
    }

    // if (this.shodown.getBattleState() === BattleStates.END_GAME) {
    //   this.gameOver();
    // }
  }

  choosePlayerCard(index: number): void {
    this.playerInputNeeded = false;
    this.shodown.pickPlayerHero(index);
    this.battleLoop();
  }

  gameOver = (): void => {
    console.log(`The winner is ${this.shodown.getVictory() ? this.shodown.getUsername() : "the computer"}`);
    this.router.navigate(["endgame"]);
  }

  currentComputerHero(): Hero {
    return this.shodown.getCurrentComputerHero();
  }

  currentPlayerHero(): Hero {
    return this.shodown.getCurrentPlayerHero();
  }

  currentAttack(): Attack {
    return this.shodown.getCurrentAttack();
  }

  currentAttackAnimation(): string {
    return this.shodown.getCurrentAttackAnimation();
  }

  currentHitEffect(): string {
    return this.shodown.getCurrentHitEffect();
  }

  currentAttackTarget(): string {
    if (this.shodown.getCurrentAttack()) {
      if (this.shodown.getCurrentAttack().target === this.shodown.getCurrentComputerHero()) {
        return 'computer';
      } else if (this.shodown.getCurrentAttack().target === this.shodown.getCurrentPlayerHero()) {
        return 'player';
      }
    }
    
    return 'none';
  }
}
