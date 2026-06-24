/* js/pets/petLevels.js */
const PET_DATA = [
  { id: 'cat',      name: 'ネコ',       icon: '🐱', rarity: 'common',   bonus: { coin: 0.05 },          desc: 'コイン獲得+5%',    reqFame: 0   },
  { id: 'dog',      name: 'イヌ',       icon: '🐶', rarity: 'common',   bonus: { explore: 0.05 },       desc: '探索速度+5%',      reqFame: 0   },
  { id: 'rabbit',   name: 'ウサギ',     icon: '🐰', rarity: 'uncommon', bonus: { xp: 0.08 },            desc: 'XP+8%',            reqFame: 15  },
  { id: 'fox',      name: 'キツネ',     icon: '🦊', rarity: 'uncommon', bonus: { luck: 0.08 },          desc: '幸運+8%',          reqFame: 20  },
  { id: 'wolf',     name: 'オオカミ',   icon: '🐺', rarity: 'rare',     bonus: { atk: 10 },             desc: 'ATK+10',           reqFame: 40  },
  { id: 'dragon',   name: 'ドラゴン',   icon: '🐉', rarity: 'epic',     bonus: { atk: 30, hp: 100 },    desc: 'ATK+30 HP+100',    reqFame: 100 },
  { id: 'phoenix',  name: 'フェニックス',icon: '🦅', rarity: 'legend',  bonus: { xp: 0.30, hp: 200 },   desc: 'XP+30% HP+200',   reqFame: 300, reqRebirth: 1 },
  { id: 'unicorn',  name: 'ユニコーン', icon: '🦄', rarity: 'legend',   bonus: { lifespan: 10, coin: 0.20 }, desc: '寿命+10年 コイン+20%', reqFame: 400, reqRebirth: 2 },
];
Object.freeze(PET_DATA);

const PetLevels = {
  getXpRequired(petId, level) { return 100 * level; },
  addXp(petId, amount) {
    if (!G.pets.xp[petId])     G.pets.xp[petId]     = 0;
    if (!G.pets.levels[petId]) G.pets.levels[petId] = 1;
    G.pets.xp[petId] += amount;
    while (G.pets.xp[petId] >= this.getXpRequired(petId, G.pets.levels[petId])) {
      G.pets.xp[petId]  -= this.getXpRequired(petId, G.pets.levels[petId]);
      G.pets.levels[petId]++;
    }
  },
  getLevelMult(petId) { return 1 + ((G.pets.levels[petId] || 1) - 1) * 0.02; },
};
