/* js/exploration/events.js - 探索中イベント */
const ExploreEvents = {
  _events: [
    { id: 'merchant', name: '旅の商人', desc: 'コインを大量獲得', chance: 0.03, effect: g => { g.resources.coins += 100; Notification.log('旅の商人に会った！コイン+100'); } },
    { id: 'spring',   name: '泉の発見', desc: 'HPが全回復',     chance: 0.02, effect: g => { g.battle.hp = g.battle.maxHp; Notification.log('神秘の泉を発見！HPが全回復！'); } },
    { id: 'ruins',    name: '遺跡の発見',desc: '素材大量獲得',  chance: 0.02, effect: g => { g.resources.materials += 50; Notification.log('小さな遺跡を発見！素材+50'); } },
  ],
  tick(G) {
    for (const ev of this._events) {
      if (RNG.chance(ev.chance / CONSTANTS.DAYS_PER_YEAR)) {
        ev.effect(G);
      }
    }
  },
};
