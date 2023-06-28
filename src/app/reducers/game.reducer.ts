import { createReducer, createSelector, on } from '@ngrx/store';
import { IMonster, initialMonster } from './../models/monster.model';
import { IPlayer, initialPlayers } from './../models/player.model';
import { hitMonster, hitBack, reset, heal, getMana, isProtected, isDead } from './../actions/player.action';

export interface GameState {
  monster: IMonster;
  players: IPlayer[];
  playersWhoPlayed: Array<number>
}

export const initialState: GameState = {
  monster: initialMonster,
  players: initialPlayers,
  playersWhoPlayed: []
};

export const gameReducer = createReducer(
  initialState,
  on(hitMonster, (updatedState, { damage, playerId }) => {
    let newState = {
      ...updatedState,
      monster: {
        ...updatedState.monster,
        pv: updatedState.monster.pv - damage,
        isHit: true
      },
      playersWhoPlayed: updatedState.playersWhoPlayed.concat([playerId])
    };
    console.log(newState);
    return newState;
  }),

  on(hitBack, (updatedState, { playerId, playerDamage }) => { 
    
    const updatedPlayers = updatedState.players.map(player => {
      const isTarget = Math.random() < 0.50;
      
      // let newState = {
      //   ...updatedState,
      //   monster: {
      //     ...updatedState.monster,
      //     isHit: true
      //   }}

      if (player.id === playerId && player.protected === 0 && Math.random() < 0.5 && isTarget) {
        return {
          ...player,
          pv: player.pv - playerDamage
        };
      }

      if(player.id === playerId && player.protected !== 0 && Math.random() < 0.5 && isTarget) {
        return {
          ...player,
          protected: player.protected - 1
        }
      }

      return player;
    });

    return {
      ...updatedState,
      players: updatedPlayers
    };
  }),

  on(reset, (updatedState) => { 
    return {
      ...updatedState,
      playersWhoPlayed: [],
    };
    
  }),

  on(heal, (updatedState, { healthPoints, playerId }) => {
    const updatedPlayers = updatedState.players.map(player => {
      if (player.id === playerId) {
        if (player.pv < player.pvMax) {
          return {
            ...player,
            pv: player.pv + healthPoints,
            mana: player.mana - healthPoints
          };
        } else {
          return player;
        }
      }
      return player;
    });
  
    return {
      ...updatedState,
      players: updatedPlayers
    };
  }),

  on(getMana, (updatedState, { manaPoints, playerId }) => {
    const updatedPlayers = updatedState.players.map(player => {
      if (player.id === playerId) {
        if (player.mana < player.manaMax) {
          return {
            ...player,
            pv: player.pv - manaPoints,
            mana: player.mana + manaPoints
          };
        } else {
          return player;
        }
      }
      return player;
    });
  
    return {
      ...updatedState,
      players: updatedPlayers
    };
  }),

  on(isProtected, (updatedState, { playerId }) => {
    const updatedPlayers = updatedState.players.map(player => {
      if (player.id === playerId && player.protected === 0) {
        return {
          ...player,
          protected: player.protected + 2
          
        };
      }
      return player;
    });
    return {
      ...updatedState,
      players: updatedPlayers
    };
  }),

  on(isDead, (updatedState, { playerId }) => {
    const updatedPlayers = updatedState.players.map(player => {
      if (player.id === playerId) {
        if(player.pv <= 0){
          return {
            ...player,
            isDead: true
            
          };
        }
      }
      return player;
    });
    return {
      ...updatedState,
      players: updatedPlayers
    };
  }),

);
