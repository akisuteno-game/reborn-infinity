/* js/equipment/accessories.js */
const ACCESSORY_DATA = [
  { id: 'lucky_ring',    name: '幸運の指輪',  icon: '💍', slot: 'accessory', rarity: 'uncommon', luck: 0.05, reqFame: 10, mat: 5, coin: 30  },
  { id: 'coin_amulet',   name: 'コインのお守り',icon: '💰', slot: 'accessory', rarity: 'rare',   coin: 0.15, reqFame: 30, mat: 15, coin: 100 },
  { id: 'xp_pendant',    name: 'XPペンダント',icon: '📖', slot: 'accessory', rarity: 'rare',     xp: 0.20, reqFame: 40, mat: 20, coin: 150 },
  { id: 'life_ring',     name: '生命の指輪',  icon: '💎', slot: 'accessory', rarity: 'epic',     hp: 100, lifespan: 5, reqFame: 80, mat: 50, coin: 400 },
  { id: 'divine_ring',   name: '神格の指輪',  icon: '✨', slot: 'accessory', rarity: 'legend',   xp: 0.30, coin: 0.20, reqFame: 300, mat: 150, coin: 3000, reqRebirth: 1 },
];
Object.freeze(ACCESSORY_DATA);
