const RaidManager = {
  _active: null,
  start(bossId){
    const boss=RAID_BOSS_DATA.find(b=>b.id===bossId);
    if(!boss||G.resources.fame<boss.reqFame)return false;
    this._active={...boss,currentHp:boss.hp};
    Notification.log('レイド開始: '+boss.name);
    return true;
  },
  attack(){
    if(!this._active)return;
    const dmg=Math.max(1,Stats.getAtk()-this._active.def);
    this._active.currentHp-=dmg;
    if(this._active.currentHp<=0){
      G.resources.coins+=this._active.coin;
      Notification.log('レイドクリア！コイン+'+this._active.coin);
      this._active=null;
    }
  },
  getActive(){ return this._active; },
};
