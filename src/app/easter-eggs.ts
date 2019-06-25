import { Hero } from './hero';

export const AngularMan: Hero = {
  id: -1,
  hero: "Angular Man",
  short_name: "A Man",
  health: 80,
  min_damage: 45,
  max_damage: 65,
  type: {
    id: 0,
    type: "all",
    strong_against: "all",
    weak_against: "none"
  }
};

export const RitualMan: Hero = {
  id: -2,
  hero: "Ritual Man",
  short_name: "R. Man",
  health: 125,
  min_damage: 30,
  max_damage: 40,
  type: {
    id: 0,
    type: "all",
    strong_against: "all",
    weak_against: "none"
  }
};