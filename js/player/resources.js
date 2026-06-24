/* ============================================
   Reborn Infinity - js/player/resources.js
   リソース（コイン・名声・素材等）管理
   ============================================ */

const Resources = {

  // ===== コイン =====
  getCoins()          { return G.resources.coins; },
  addCoins(amount)    {
    const actual = Math.max(0, amount) * Stats.getCoinMult();
    G.resources.coins += actual;
    G.resources.totalCoinsEarned += actual;
    return actual;
  },
  spendCoins(amount)  {
    if (G.resources.coins < amount) return false;
    G.resources.coins -= amount;
    return true;
  },
  hasCoins(amount)    { return G.resources.coins >= amount; },

  // ===== 名声 =====
  getFame()           { return G.resources.fame; },
  addFame(amount)     {
    G.resources.fame += Math.max(0, amount) * Stats.getFameMult();
  },

  // ===== 素材 =====
  getMaterials()      { return G.resources.materials; },
  addMaterials(amount) {
    G.resources.materials += Math.max(0, amount) * Stats.getMatMult();
  },
  spendMaterials(amount) {
    if (G.resources.materials < amount) return false;
    G.resources.materials -= amount;
    return true;
  },
  hasMaterials(amount) { return G.resources.materials >= amount; },

  // ===== 魂の欠片（Tier1） =====
  getSoulFragments()     { return G.resources.soulFragments; },
  addSoulFragments(n)    { G.resources.soulFragments += Math.max(0, n); },
  spendSoulFragments(n)  {
    if (G.resources.soulFragments < n) return false;
    G.resources.soulFragments -= n;
    return true;
  },

  // ===== 魂ポイント（Tier1） =====
  getSoulPoints()        { return G.resources.soulPoints; },
  addSoulPoints(n)       { G.resources.soulPoints += Math.max(0, n); },
  spendSoulPoints(n)     {
    if (G.resources.soulPoints < n) return false;
    G.resources.soulPoints -= n;
    return true;
  },
  hasSoulPoints(n)       { return G.resources.soulPoints >= n; },

  // ===== 覚醒結晶（Tier2） =====
  getAwakeningCrystals()    { return G.resources.awakeningCrystals; },
  addAwakeningCrystals(n)   { G.resources.awakeningCrystals += Math.max(0, n); },
  spendAwakeningCrystals(n) {
    if (G.resources.awakeningCrystals < n) return false;
    G.resources.awakeningCrystals -= n;
    return true;
  },

  // ===== 星座ポイント（Tier2） =====
  getConstellationPoints()    { return G.resources.constellationPoints; },
  addConstellationPoints(n)   { G.resources.constellationPoints += Math.max(0, n); },
  spendConstellationPoints(n) {
    if (G.resources.constellationPoints < n) return false;
    G.resources.constellationPoints -= n;
    return true;
  },

  // ===== 超越エッセンス（Tier3） =====
  getEssence()    { return G.resources.transcendenceEssence; },
  addEssence(n)   { G.resources.transcendenceEssence += Math.max(0, n); },
  spendEssence(n) {
    if (G.resources.transcendenceEssence < n) return false;
    G.resources.transcendenceEssence -= n;
    return true;
  },

  // ===== 神威（Tier4） =====
  getDivinePower()    { return G.resources.divinePower; },
  addDivinePower(n)   { G.resources.divinePower += Math.max(0, n); },
  spendDivinePower(n) {
    if (G.resources.divinePower < n) return false;
    G.resources.divinePower -= n;
    return true;
  },

  // ===== 信仰ポイント（Tier4） =====
  getFaithPoints()    { return G.resources.faithPoints; },
  addFaithPoints(n)   { G.resources.faithPoints += Math.max(0, n); },

  // ===== 創世力（Tier5） =====
  getCreationPower()    { return G.resources.creationPower; },
  addCreationPower(n)   { G.resources.creationPower += Math.max(0, n); },
  spendCreationPower(n) {
    if (G.resources.creationPower < n) return false;
    G.resources.creationPower -= n;
    return true;
  },

  // ===== 汎用：リソース追加 =====
  add(resourceKey, amount) {
    if (!(resourceKey in G.resources)) return;
    G.resources[resourceKey] += Math.max(0, amount);
  },

  get(resourceKey) {
    return G.resources[resourceKey] ?? 0;
  },

  spend(resourceKey, amount) {
    if (!(resourceKey in G.resources)) return false;
    if (G.resources[resourceKey] < amount) return false;
    G.resources[resourceKey] -= amount;
    return true;
  },

  has(resourceKey, amount) {
    return (G.resources[resourceKey] ?? 0) >= amount;
  },

  // ===== リセット（転生時） =====
  resetOnRebirth() {
    G.resources.coins     = 0;
    G.resources.fame      = 0;
    G.resources.materials = 0;
    // soulFragments / soulPoints は引き継ぐ
  },

};
