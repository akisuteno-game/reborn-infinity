/* js/exploration/travel.js - 移動・旅システム */
const Travel = {
  moveTo(regionId) {
    if (!WorldMap.isUnlocked(regionId)) return false;
    if (G.explore.current === regionId)  return false;
    G.explore.current  = regionId;
    G.explore.progress = 0;
    const r = REGION_DATA.find(r => r.id === regionId);
    Notification.log((r ? r.name : regionId) + 'へ出発！');
    return true;
  },
  cancel() {
    G.explore.current  = null;
    G.explore.progress = 0;
  },
};
