/* ============================================
   Reborn Infinity - js/core/game.js
   ゲームエントリーポイント・初期化
   ============================================ */

const Game = {

  // ===== 起動 =====
  async init() {
    console.log(`[Game] Reborn Infinity v${CONSTANTS.VERSION} 起動中...`);

    // 依存チェック
    const required = { UIManager, ThemeManager, GameLoop, SaveManager, Config, State, AutoSave };
    for (const [name, obj] of Object.entries(required)) {
      if (typeof obj === 'undefined') {
        throw new Error(`必須モジュール "${name}" が読み込まれていません。index.html を再デプロイしてください。`);
      }
    }

    try {
      // 1. 設定初期化
      Config.init();

      // 2. 状態初期化
      State.init();

      // 3. セーブデータ読み込み
      const loaded = SaveManager.load();
      if (loaded) {
        console.log('[Game] セーブデータを読み込みました');
        UIManager.showToast('セーブデータを読み込みました', 'info');
      } else {
        console.log('[Game] 新規ゲーム開始');
        this._newGame();
      }

      // 4. UI初期化
      UIManager.init();

      // 5. テーマ適用
      ThemeManager.apply(Config.get('theme'));

      // 6. タブ初期化
      UIManager.showTab('status');

      // 7. ゲームループ開始
      GameLoop.setSpeed(Config.get('speed'));
      GameLoop.start();

      // 8. オートセーブ開始
      AutoSave.start();

      // 9. オフライン進行処理
      if (Config.get('offlineProgress') && loaded) {
        OfflineProgress.process();
      }

      // 10. イベント登録
      this._registerEvents();

      console.log('[Game] 初期化完了');

    } catch (e) {
      console.error('[Game] 初期化エラー:', e);
      this._showErrorScreen(e);
    }
  },

  // ===== 新規ゲーム =====
  _newGame() {
    State.reset();
    Notification.show('Reborn Infinity へようこそ！', '名もなき村人として新たな人生を歩もう。', 'accent');
  },

  // ===== イベント登録 =====
  _registerEvents() {

    // 寿命終了
    EventBus.on(GAME_EVENTS.LIFESPAN_END, () => {
      UIManager.showRebirthNotice();
    });

    // レベルアップ通知
    EventBus.on(GAME_EVENTS.JOB_LEVEL_UP, ({ jobName, level }) => {
      if (Config.get('showLevelUpNotif')) {
        Notification.show(`${jobName} Lv.${level}！`, 'レベルアップ！', 'success');
      }
    });

    EventBus.on(GAME_EVENTS.SKILL_LEVEL_UP, ({ skillName, level }) => {
      if (Config.get('showLevelUpNotif')) {
        Notification.show(`${skillName} Lv.${level}！`, 'スキルレベルアップ！', 'accent');
      }
    });

    // 実績解除通知
    EventBus.on(GAME_EVENTS.ACHIEVEMENT_UNLOCK, ({ name, title }) => {
      if (Config.get('showAchievNotif')) {
        Notification.show(`実績解除: 「${name}」`, title ? `称号: ${title}` : '', 'gold');
      }
    });

    // 転生通知
    EventBus.on(GAME_EVENTS.REBIRTH, ({ count, bonus }) => {
      Notification.show(`転生 ${count}回目！`, `XPボーナス: ${NumberUtil.mult(bonus)}`, 'accent');
    });

    // Tier昇格通知
    EventBus.on(GAME_EVENTS.TIER_UP, ({ tier, name }) => {
      Notification.show(`Tier ${tier}: ${name} 解放！`, '新たな力に目覚めた！', 'gold');
    });

  },

  // ===== エラー画面 =====
  _showErrorScreen(error) {
    document.body.innerHTML = `
      <div style="
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        min-height:100vh; background:#070914; color:#dfe4ff; font-family:sans-serif;
        gap:16px; padding:24px; text-align:center;
      ">
        <div style="font-size:48px">⚠️</div>
        <h1 style="font-size:20px; color:#f3d98a;">初期化エラー</h1>
        <p style="color:#8b93c9; font-size:14px; max-width:400px;">
          ゲームの起動中にエラーが発生しました。<br>
          キャッシュをクリアして再読み込みしてください。
        </p>
        <pre style="
          background:#0d1126; border:1px solid #2a3470; border-radius:8px;
          padding:12px; font-size:11px; color:#ef4444; max-width:480px;
          overflow:auto; text-align:left;
        ">${error.message}\n${error.stack}</pre>
        <button onclick="location.reload()" style="
          padding:10px 24px; background:#4ade80; color:#070914;
          border:none; border-radius:8px; font-size:14px; font-weight:700; cursor:pointer;
        ">再読み込み</button>
      </div>
    `;
  },

  // ===== 手動セーブ =====
  save() {
    SaveManager.save();
    Notification.show('セーブしました', '', 'info');
  },

  // ===== ゲームリセット =====
  hardReset() {
    if (!confirm('本当にリセットしますか？すべてのデータが消去されます。')) return;
    SaveManager.deleteSave();
    location.reload();
  },

};

// ===== DOM読み込み完了後に起動 =====
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
