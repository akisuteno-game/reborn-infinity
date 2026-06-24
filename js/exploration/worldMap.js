/* js/exploration/worldMap.js - ワールドマップ管理 */
const WorldMap = {
  getUnlocked() {
    return REGION_DATA.filter(r => {
      if (r.reqFame   && G.resources.fame    < r.reqFame)   return false;
      if (r.reqRebirth&& G.rebirth.count     < r.reqRebirth)return false;
      if (r.reqTier   && G.tier              < r.reqTier)   return false;
      return true;
    });
  },
  isUnlocked(regionId) {
    const r = REGION_DATA.find(r => r.id === regionId);
    if (!r) return false;
    if (r.reqFame    && G.resources.fame    < r.reqFame)    return false;
    if (r.reqRebirth && G.rebirth.count     < r.reqRebirth) return false;
    if (r.reqTier    && G.tier              < r.reqTier)    return false;
    return true;
  },
};
