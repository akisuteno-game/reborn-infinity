/* js/guilds/guildBonuses.js */
const GuildBonuses = {
  getBonus(stat) {
    if (!G.guilds.research) return 0;
    let total = 0;
    for (const r of GUILD_RESEARCH_DATA) {
      const lv = G.guilds.research[r.id] || 0;
      if (r.bonus[stat]) total += r.bonus[stat] * lv;
    }
    return total;
  },
  research(researchId) {
    const r = GUILD_RESEARCH_DATA.find(r => r.id === researchId);
    if (!r) return false;
    const lv = G.guilds.research[researchId] || 0;
    if (lv >= r.maxLevel) return false;
    if (G.resources.coins < r.cost.coin) return false;
    G.resources.coins -= r.cost.coin;
    G.guilds.research[researchId] = lv + 1;
    Notification.log('ギルド研究: ' + r.name + ' Lv' + (lv+1) + '！');
    return true;
  },
};
