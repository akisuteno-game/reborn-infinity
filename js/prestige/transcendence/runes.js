const RUNE_DATA = [
  { id:'atk_rune',   name:'攻撃ルーン', icon:'⚔️', cost:500,  bonus:{ atk:100 },   desc:'ATK+100' },
  { id:'def_rune',   name:'防御ルーン', icon:'🛡️', cost:500,  bonus:{ def:80  },   desc:'DEF+80'  },
  { id:'xp_rune',    name:'経験ルーン', icon:'📖', cost:800,  bonus:{ xp:2.0  },   desc:'XP+200%' },
  { id:'coin_rune',  name:'富のルーン', icon:'💰', cost:800,  bonus:{ coin:2.0},   desc:'コイン+200%' },
  { id:'void_rune',  name:'虚無ルーン', icon:'🕳️', cost:5000, bonus:{ xp:5.0,coin:5.0 }, desc:'全リソース+500%' },
];
Object.freeze(RUNE_DATA);
const Runes = {
  getOwned(){ return G.transcendence.runes||{}; },
  equip(id){
    const r=RUNE_DATA.find(r=>r.id===id);
    if(!r||G.resources.transcendenceEssence<r.cost)return false;
    G.resources.transcendenceEssence-=r.cost;
    if(!G.transcendence.runes)G.transcendence.runes={};
    G.transcendence.runes[id]=(G.transcendence.runes[id]||0)+1;
    Notification.log('ルーン装着: '+r.name+'！');
    Stats.update(); return true;
  },
  getBonus(stat){ let t=0; for(const id in this.getOwned()){ const r=RUNE_DATA.find(r=>r.id===id); if(r?.bonus[stat])t+=r.bonus[stat]*(this.getOwned()[id]||0); } return t; },
};
