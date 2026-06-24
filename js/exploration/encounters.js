/* js/exploration/encounters.js - エンカウント管理 */
const Encounters = {
  roll(regionId) {
    if (!RNG.chancePct(15)) return null;
    const region = REGION_DATA.find(r => r.id === regionId);
    if (!region) return null;
    const enemies = ENEMY_DATA.filter(e => e.reqFame <= G.resources.fame);
    return RNG.pick(enemies) || null;
  },
};
