import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { hitMonster, isProtected, hitBack, reset, getMana, isDead } from 'src/app/actions/player.action';
import { GameState } from 'src/app/reducers/game.reducer';
import { heal } from 'src/app/actions/player.action';

@Component({
  selector: 'app-button-capacity',
  templateUrl: './button-capacity.component.html',
  styleUrls: ['./button-capacity.component.scss']
})
export class ButtonCapacityComponent implements OnInit{
  @Input() player: any;
  
  playersWhoPlayed?: Array<number> 
  

  constructor(private store: Store<{game: GameState}>) {
  }

  ngOnInit(): void {

    this.store.select(state => state.game).subscribe((game: GameState) => { 
      this.playersWhoPlayed = game.playersWhoPlayed; 
    })
  }
  

   onClick(playerId: number) {

    this.store.dispatch(hitMonster({ damage: 5, playerId: this.player.id })); // PLAYER HITS 5 POITS
    
    this.store.dispatch(hitBack({ playerId , playerDamage: 10 })) // MONSTER HITS BACK 10 POITS

    if(this.playersWhoPlayed?.length == 4){
      this.store.dispatch(hitBack({ playerId , playerDamage: 20 }))
      this.store.dispatch(reset())
    }

    if(this.player.isDead){

    }

    
  }

  clickToHeal(playerId: number){
    playerId = this.player.id
    this.store.dispatch(heal({ healthPoints: 5, playerId: this.player.id }));
    if(this.player.pv === this.player.pvMax) {
      return
    }
  }

  clickToGetMana(playerId: number){
    playerId = this.player.id
    this.store.dispatch(getMana({ manaPoints: 5, playerId: this.player.id }));
    if(this.player.mana === this.player.manaMax){
      return
    }
  }

  savePlayer(playerId: number){
    playerId = this.player.id
    this.store.dispatch(isProtected({ playerId: this.player.id }));
  }
}
