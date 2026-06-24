/* ============================================
   Reborn Infinity - js/save/saveManager.js
   セーブデータ管理
   ============================================ */

const SaveManager = {

  // ===== セーブ =====
  save() {
    try {
      const data = this._buildSaveData();
      const json = JSON.stringify(data);
      localStorage.setItem(CONSTANTS.SAVE_KEY, json);
      G.meta.lastSaved = Date.now();
      EventBus.emit(GAME_EVENTS.SAVE, { timestamp: G.meta.lastSaved });
      return true;
    } catch (e) {
      console.error('[SaveManager] セーブ失敗:', e);
      return false;
    }
  },

  // ===== ロード =====
  load() {
    try {
      const json = localStorage.getItem(CONSTANTS.SAVE_KEY);
      if (!json) return false;

      const data = JSON.parse(json);

      // バージョン移行
      const migrated = Migration.migrate(data);

      // 状態にマージ
      State.merge(migrated.gameState);

      // 設定を復元
      if (migrated.config) {
        Config.init(migrated.config);
      }

      return true;
    } catch (e) {
      console.error('[SaveManager] ロード失敗:', e);
      return false;
    }
  },

  // ===== セーブデータ削除 =====
  deleteSave() {
    localStorage.removeItem(CONSTANTS.SAVE_KEY);
  },

  // ===== セーブデータ存在確認 =====
  hasSave() {
    return localStorage.getItem(CONSTANTS.SAVE_KEY) !== null;
  },

  // ===== セーブデータ構築 =====
  _buildSaveData() {
    return {
      version:   CONSTANTS.SAVE_VERSION,
      savedAt:   Date.now(),
      gameState: G,
      config:    Config.getAll(),
    };
  },

};
