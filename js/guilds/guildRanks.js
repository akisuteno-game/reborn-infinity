/* js/guilds/guildRanks.js */
const GUILD_RANKS = [
  { rank: 0, name: '新米',   reqFame: 0   },
  { rank: 1, name: '一般',   reqFame: 50  },
  { rank: 2, name: '上級',   reqFame: 200 },
  { rank: 3, name: 'エース', reqFame: 500 },
  { rank: 4, name: '幹部',   reqFame: 1000 },
  { rank: 5, name: 'ギルド長',reqFame: 5000 },
];
const GuildRanks = {
  getCurrent() {
    const ranks = [...GUILD_RANKS].reverse();
    return ranks.find(r => G.resources.fame >= r.reqFame) || GUILD_RANKS[0];
  },
};
