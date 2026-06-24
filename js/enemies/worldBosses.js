/* js/enemies/worldBosses.js - ワールドボスデータ */
const WORLD_BOSS_DATA = [
  { id: 'world_dragon',  name: 'ワールドドラゴン', icon: '🌍', hp: 10000000, atk: 2000, def: 1500, coin: 1000000, reqFame: 1000, type: 'world', reqRebirth: 3 },
  { id: 'world_creator', name: 'ワールドクリエイター', icon: '✨', hp: 999999999, atk: 99999, def: 50000, coin: 99999999, reqFame: 99999, type: 'world', reqTier: 15 },
];
Object.freeze(WORLD_BOSS_DATA);
