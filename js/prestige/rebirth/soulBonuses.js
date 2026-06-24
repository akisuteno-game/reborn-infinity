/* js/prestige/rebirth/soulBonuses.js */
const SoulBonuses = {
  getXpMult()      { return 1 + SoulTree.getBonus('xp'); },
  getCoinMult()    { return 1 + SoulTree.getBonus('coin'); },
  getLifespanBonus(){ return SoulTree.getBonus('lifespan'); },
  getSkillXpMult() { return 1 + SoulTree.getBonus('skillXp'); },
  getExploreBonus(){ return SoulTree.getBonus('explore'); },
  getCraftBonus()  { return SoulTree.getBonus('craft'); },
};
