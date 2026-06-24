/* js/equipment/weapons.js */
const WEAPON_DATA = [
  { id: 'wooden_sword',  name: '木の剣',   icon: '🪵', slot: 'weapon', rarity: 'common',   atk: 5,   reqFame: 0,   mat: 3,  coin: 0   },
  { id: 'iron_sword',    name: '鉄の剣',   icon: '⚔️', slot: 'weapon', rarity: 'uncommon', atk: 12,  reqFame: 10,  mat: 8,  coin: 20  },
  { id: 'steel_sword',   name: '鋼の剣',   icon: '🗡️', slot: 'weapon', rarity: 'rare',     atk: 25,  reqFame: 30,  mat: 20, coin: 80  },
  { id: 'magic_staff',   name: '魔法の杖', icon: '🪄', slot: 'weapon', rarity: 'rare',     atk: 20,  mp: 30, reqFame: 40, mat: 20, coin: 100 },
  { id: 'dragon_blade',  name: '龍の剣',   icon: '🐉', slot: 'weapon', rarity: 'epic',     atk: 60,  reqFame: 100, mat: 60, coin: 500 },
  { id: 'divine_sword',  name: '神剣',     icon: '✨', slot: 'weapon', rarity: 'legend',   atk: 150, reqFame: 300, mat: 200, coin: 5000, reqRebirth: 1 },
];
Object.freeze(WEAPON_DATA);
