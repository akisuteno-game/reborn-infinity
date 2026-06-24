/* js/exploration/explorationManager.js - 探索統括 */
const ExplorationManager = {
  tick(G) {
    ExploreEvents.tick(G);
    if (!G.explore.current) return;
    const region = REGION_DATA.find(r => r.id === G.explore.current);
    if (!region) { G.explore.current = null; return; }
    G.explore.progress++;
    if (G.explore.progress >= region.ticks) {
      const mat  = RNG.varyInt(region.mat,  0.3) * Stats.getMatMult();
      const coin = RNG.varyInt(region.coin, 0.3) * Stats.getCoinMult();
      G.resources.materials += Math.floor(mat);
      G.resources.coins     += Math.floor(coin);
      G.resources.fame      += region.reqFame * 0.05 * Stats.getFameMult();
      G.explore.totalExplored++;
      if (!G.explore.visited.includes(region.id)) G.explore.visited.push(region.id);
      Notification.log(region.name + 'から帰還！素材+' + Math.floor(mat) + ' コイン+' + Math.floor(coin));
      EventBus.emit(GAME_EVENTS.EXPLORE_COMPLETE, { regionId: region.id });
      const treasure = Treasure.roll(region.id);
      Treasure.open(treasure);
      G.explore.current  = null;
      G.explore.progress = 0;
    }
  },
  start(regionId) { return Travel.moveTo(regionId); },
  cancel()        { Travel.cancel(); },
  getDisplayList() {
    return REGION_DATA.map(r => ({
      ...r,
      isActive:   G.explore.current === r.id,
      isUnlocked: WorldMap.isUnlocked(r.id),
      progress:   G.explore.current === r.id ? G.explore.progress : 0,
      pct:        G.explore.current === r.id ? MathUtil.pct(G.explore.progress, r.ticks) : 0,
    }));
  },
};
