/* js/prestige/rebirth/soulFragments.js */
const SoulFragments = {
  calc(G) {
    let f = 0;
    for(const id in G.jobs.levels) f += G.jobs.levels[id];
    f += G.time.age * 0.5;
    f += Math.log10(Math.max(1, G.resources.totalCoinsEarned)) * 10;
    f += G.achievements.unlocked.length * 5;
    f += G.battle.totalKills * 2;
    return Math.floor(f);
  },
  convert(fragments) {
    const sp = Math.floor(fragments * (1 + (G.rebirth.count || 0) * 0.2));
    G.resources.soulFragments += fragments;
    G.resources.soulPoints    += sp;
    return sp;
  },
};
