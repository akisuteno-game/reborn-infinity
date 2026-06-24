/* js/crafting/recipes.js */
const RECIPE_DATA = [
  { id: 'herb_potion',   name: '薬草ポーション', icon: '🧪', mat: 3,  coin: 0,   result: 'hp_potion',   desc: 'HPを50回復',      reqFame: 0  },
  { id: 'iron_sword',    name: '鉄の剣',         icon: '⚔️', mat: 8,  coin: 20,  result: 'iron_sword',  desc: 'ATK+12',          reqFame: 10 },
  { id: 'iron_armor',    name: '鉄の鎧',         icon: '🛡️', mat: 12, coin: 30,  result: 'iron_armor',  desc: 'DEF+18 HP+100',   reqFame: 20 },
  { id: 'magic_staff',   name: '魔法の杖',       icon: '🪄', mat: 20, coin: 50,  result: 'magic_staff', desc: 'ATK+20 MP+30',    reqFame: 40 },
  { id: 'lucky_ring',    name: '幸運の指輪',     icon: '💍', mat: 5,  coin: 30,  result: 'lucky_ring',  desc: '幸運+5%',          reqFame: 10 },
  { id: 'xp_pendant',   name: 'XPペンダント',   icon: '📖', mat: 20, coin: 150, result: 'xp_pendant',  desc: 'XP+20%',          reqFame: 40 },
  { id: 'dragon_blade',  name: '龍の剣',         icon: '🐉', mat: 60, coin: 500, result: 'dragon_blade',desc: 'ATK+60',          reqFame: 100 },
  { id: 'dragon_armor',  name: '龍鱗の鎧',       icon: '🐲', mat: 60, coin: 500, result: 'dragon_armor',desc: 'DEF+50 HP+300',   reqFame: 100 },
  { id: 'life_ring',     name: '生命の指輪',     icon: '💎', mat: 50, coin: 400, result: 'life_ring',   desc: 'HP+100 寿命+5年', reqFame: 80  },
];
Object.freeze(RECIPE_DATA);
