/* js/guilds/guildManager.js */
const GuildManager = {
  getCurrentRank() { return GuildRanks.getCurrent(); },
  getResearchList() {
    return GUILD_RESEARCH_DATA.map(r => ({
      ...r, level: G.guilds.research[r.id] || 0,
      canResearch: G.resources.coins >= r.cost.coin && (G.guilds.research[r.id]||0) < r.maxLevel,
    }));
  },
  doResearch(id) { return GuildBonuses.research(id); },
};
