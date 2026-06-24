/* js/equipment/armors.js */
const ARMOR_DATA = [
  { id: 'cloth_armor',   name: '布の鎧',   icon: '👘', slot: 'armor', rarity: 'common',   def: 3,  hp: 20,  reqFame: 0,  mat: 3,  coin: 0   },
  { id: 'leather_armor', name: '革の鎧',   icon: '🥼', slot: 'armor', rarity: 'uncommon', def: 8,  hp: 50,  reqFame: 10, mat: 8,  coin: 20  },
  { id: 'iron_armor',    name: '鉄の鎧',   icon: '🛡️', slot: 'armor', rarity: 'rare',     def: 18, hp: 100, reqFame: 30, mat: 20, coin: 80  },
  { id: 'dragon_armor',  name: '龍鱗の鎧', icon: '🐲', slot: 'armor', rarity: 'epic',     def: 50, hp: 300, reqFame: 100, mat: 60, coin: 500 },
  { id: 'divine_armor',  name: '神鎧',     icon: '😇', slot: 'armor', rarity: 'legend',   def: 120, hp: 800, lifespan: 10, reqFame: 300, mat: 200, coin: 5000, reqRebirth: 1 },
];
Object.freeze(ARMOR_DATA);
