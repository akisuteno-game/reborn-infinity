/* ============================================
   Reborn Infinity - js/save/loadManager.js
   ロード時の後処理
   ============================================ */

const LoadManager = {

  // ===== ロード後の後処理 =====
  postLoad() {
    // ステータス再計算
    Stats.update();
    Lifespan.update();

    // UI更新
    if (typeof UIManager !== 'undefined') {
      UIManager.render();
    }

    console.log('[LoadManager] ロード後処理完了');
  },

};
