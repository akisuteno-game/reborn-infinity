/* js/enemies/raidBosses.js - レイドボスデータ */
const RAID_BOSS_DATA = [
  { id: 'raid_dragon',     name: 'レイドドラゴン',   icon: '🐲', hp: 100000,  atk: 300,   def: 200,   coin: 10000,  reqFame: 200,  type: 'raid' },
  { id: 'raid_demon_lord', name: 'レイド魔王',       icon: '💀', hp: 500000,  atk: 800,   def: 500,   coin: 50000,  reqFame: 500,  type: 'raid', reqRebirth: 1 },
  { id: 'raid_void',       name: 'レイド虚無神',     icon: '🌑', hp: 9999999, atk: 5000,  def: 3000,  coin: 500000, reqFame: 5000, type: 'raid', reqTier: 14 },
];
Object.freeze(RAID_BOSS_DATA);
