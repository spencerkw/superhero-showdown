import { Hero } from './hero';
import { AttackType } from './attack-type';

export interface Attack {
    attacker: Hero;
    target: Hero;
    damage: number;
    attackType: AttackType
}
