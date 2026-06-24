/* ============================================
   Reborn Infinity - js/save/autoSave.js
   オートセーブ
   ============================================ */

const AutoSave = {

  _intervalId: null,

  // ===== 開始 =====
  start() {
    this.stop();
    const interval = (Config.get('autoSaveInterval') || 30) * 1000;
    this._intervalId = setInterval(() => {
      if (Config.get('autoSave')) {
        SaveManager.save();
        console.log('[AutoSave] 自動セーブ完了');
      }
    }, interval);
  },

  // ===== 停止 =====
  stop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  },

  // ===== ページ離脱時もセーブ =====
  setupUnloadSave() {
    window.addEventListener('beforeunload', () => {
      if (Config.get('autoSave')) SaveManager.save();
    });
    // visibilitychange（タブ切替・バックグラウンド）
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && Config.get('autoSave')) SaveManager.save();
    });
  },

};
