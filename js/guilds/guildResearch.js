/* js/guilds/guildResearch.js */
const GUILD_RESEARCH_DATA = [
  { id: 'xp_boost',    name: 'XP研究',    cost: { coin: 1000 }, bonus: { xp: 0.10 },   desc: 'XP獲得+10%',   maxLevel: 10 },
  { id: 'coin_boost',  name: 'コイン研究', cost: { coin: 1000 }, bonus: { coin: 0.10 }, desc: 'コイン+10%',   maxLevel: 10 },
  { id: 'mat_boost',   name: '素材研究',   cost: { coin: 800  }, bonus: { mat: 0.10 },  desc: '素材+10%',     maxLevel: 10 },
  { id: 'combat_boost',name: '戦闘研究',   cost: { coin: 1200 }, bonus: { atk: 5 },     desc: 'ATK+5',        maxLevel: 10 },
];
Object.freeze(GUILD_RESEARCH_DATA);
