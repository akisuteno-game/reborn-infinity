/* ============================================
   Reborn Infinity - js/save/migration.js
   セーブデータバージョン移行
   ============================================ */

const Migration = {

  // ===== 移行処理 =====
  migrate(data) {
    let current = data;
    const fromVersion = current.version || 0;

    // v0 → v1
    if (fromVersion < 1) {
      current = this._v0toV1(current);
    }

    // 以降バージョンアップ時に追加
    // if (fromVersion < 2) { current = this._v1toV2(current); }

    current.version = CONSTANTS.SAVE_VERSION;
    return current;
  },

  // ===== v0 → v1 =====
  _v0toV1(data) {
    console.log('[Migration] v0 → v1 移行中...');
    // 旧データ構造との互換性対応
    if (!data.gameState) {
      data = { gameState: data, version: 0 };
    }
    return data;
  },

};
