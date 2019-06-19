import { AttackType } from './attack-type';

export interface Hero {
  id: number;
  hero: string;
  health: number;
  min_damage: number;
  max_damage: number;
  type: AttackType;
  currentHealth?: number;
}
