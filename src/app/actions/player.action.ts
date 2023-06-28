import { createAction, props } from '@ngrx/store';


export const hitMonster = createAction('[Player] Attack Monster', props<{ damage: number, playerId :number }>());
export const hitBack = createAction('[Monster] Attack the Player', props<{ playerId: number, playerDamage: number }>());
export const reset = createAction('[Game] Reset Players Who Played');
export const heal = createAction('[Game] heal the Player by taking its mana', props<{ healthPoints: number, playerId: number}>());
export const getMana = createAction('[Game] gives mana back,  but takes hitpoints', props<{ manaPoints: number, playerId: number }>());
export const isProtected = createAction('[Game] protects the player within 2 turns', props<{ playerId: number }>());
export const isDead = createAction('[Game] shows if the player is dead or not', props<{ playerId: number }>())