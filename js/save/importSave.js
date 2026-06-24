/* ============================================
   Reborn Infinity - js/save/importSave.js
   セーブデータインポート
   ============================================ */

const ImportSave = {

  // ===== インポート（Base64文字列から） =====
  import(base64str) {
    try {
      const json = decodeURIComponent(escape(atob(base64str.trim())));
      const data = JSON.parse(json);

      // バリデーション
      if (!data.gameState || !data.version) {
        throw new Error('無効なセーブデータです');
      }

      // バージョン移行
      const migrated = Migration.migrate(data);

      // 状態にマージ
      State.merge(migrated.gameState);
      if (migrated.config) Config.init(migrated.config);

      // LocalStorageにも保存
      SaveManager.save();

      // 後処理
      LoadManager.postLoad();

      return { success: true };
    } catch (e) {
      console.error('[ImportSave] インポート失敗:', e);
      return { success: false, error: e.message };
    }
  },

  // ===== クリップボードから読み込み =====
  async fromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      return this.import(text);
    } catch (e) {
      return { success: false, error: 'クリップボードの読み込みに失敗しました' };
    }
  },

  // ===== ファイルから読み込み =====
  fromFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = this.import(e.target.result);
        resolve(result);
      };
      reader.onerror = () => resolve({ success: false, error: 'ファイルの読み込みに失敗しました' });
      reader.readAsText(file);
    });
  },

};
