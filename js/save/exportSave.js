/* ============================================
   Reborn Infinity - js/save/exportSave.js
   セーブデータエクスポート（テキスト出力）
   ============================================ */

const ExportSave = {

  // ===== エクスポート（Base64文字列） =====
  export() {
    try {
      const data = {
        version:   CONSTANTS.SAVE_VERSION,
        savedAt:   Date.now(),
        gameState: G,
        config:    Config.getAll(),
      };
      const json   = JSON.stringify(data);
      const base64 = btoa(unescape(encodeURIComponent(json)));
      return base64;
    } catch (e) {
      console.error('[ExportSave] エクスポート失敗:', e);
      return null;
    }
  },

  // ===== クリップボードにコピー =====
  async copyToClipboard() {
    const str = this.export();
    if (!str) return false;
    try {
      await navigator.clipboard.writeText(str);
      return true;
    } catch (e) {
      // フォールバック
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      return true;
    }
  },

  // ===== ファイルダウンロード =====
  downloadFile() {
    const str = this.export();
    if (!str) return false;
    const blob = new Blob([str], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `reborn-infinity-save-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  },

};
