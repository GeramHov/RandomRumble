export interface IMonster { 
    id: number; 
    name: string; 
    pvMax: number, 
    pv: number, 
    isHit: boolean
  } 
    
  export const initialMonster: IMonster = { 
    id: 1, 
    name: 'Monster', 
    pvMax: 800, 
    pv: 800, 
    isHit: false
  };