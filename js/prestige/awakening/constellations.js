const CONSTELLATION_DATA = [
  { id:'warrior_star', name:'戦神座', icon:'⚔️', cost:1000, bonus:{ atk:50, critRate:0.10 }, desc:'攻撃力+50 会心率+10%' },
  { id:'merchant_star',name:'商神座', icon:'💰', cost:1000, bonus:{ coin:1.0 },             desc:'コイン獲得+100%' },
  { id:'life_star',    name:'生命座', icon:'💚', cost:1000, bonus:{ hp:300, lifespan:10 },   desc:'HP+300 寿命+10年' },
  { id:'explore_star', name:'探索座', icon:'🗺️', cost:1000, bonus:{ explore:0.50 },          desc:'探索速度+50%' },
  { id:'xp_star',      name:'知識座', icon:'📖', cost:1000, bonus:{ xp:1.0 },               desc:'XP獲得+100%' },
  { id:'time_star',    name:'時空座', icon:'⏳', cost:2000, bonus:{ lifespan:20, xp:0.50 },  desc:'寿命+20年 XP+50%' },
];
Object.freeze(CONSTELLATION_DATA);
const Constellations = {
  isUnlocked(id){ return G.awakening.unlocked.includes(id); },
  canUnlock(id){ const c=CONSTELLATION_DATA.find(c=>c.id===id); return c && G.resources.constellationPoints>=c.cost && !this.isUnlocked(id); },
  unlock(id){
    if(!this.canUnlock(id))return false;
    const c=CONSTELLATION_DATA.find(c=>c.id===id);
    G.resources.constellationPoints-=c.cost;
    G.awakening.unlocked.push(id);
    G.awakening.constellations[id]=1;
    Notification.log('星座解放: '+c.name+'！');
    Stats.update(); return true;
  },
  getBonus(stat){ let t=0; for(const id of G.awakening.unlocked){ const c=CONSTELLATION_DATA.find(c=>c.id===id); if(c?.bonus[stat])t+=c.bonus[stat]; } return t; },
};
