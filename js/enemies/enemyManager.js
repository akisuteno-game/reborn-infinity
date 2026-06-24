/* js/enemies/enemyManager.js - 敵統括マネージャー */
const EnemyManager = {
  getAllEnemies() {
    return [...NORMAL_ENEMIES, ...ELITE_ENEMIES, ...BOSS_DATA, ...RAID_BOSS_DATA, ...WORLD_BOSS_DATA];
  },
  getById(id) { return this.getAllEnemies().find(e => e.id === id); },
  getAvailable() {
    return this.getAllEnemies().filter(e => {
      if (e.reqFame    && G.resources.fame   < e.reqFame)    return false;
      if (e.reqRebirth && G.rebirth.count    < e.reqRebirth) return false;
      if (e.reqTier    && G.tier             < e.reqTier)    return false;
      return true;
    });
  },
  getByType(type) { return this.getAllEnemies().filter(e => e.type === type); },
};
// ENEMY_DATAとして統合エクスポート
const ENEMY_DATA = [...NORMAL_ENEMIES, ...ELITE_ENEMIES, ...BOSS_DATA];
