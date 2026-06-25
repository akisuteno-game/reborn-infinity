/* ============================================
   Reborn Infinity - js/core/game.js
   ゲームエントリーポイント・初期化
   ============================================ */

const Game = {

  async init() {
    console.log('[Game] Reborn Infinity v' + CONSTANTS.VERSION + ' 起動中...');
    try {
      // 1. 設定初期化
      Config.init();

      // 2. 状態初期化
      State.init();

      // 3. セーブデータ読み込み
      const loaded = SaveManager.load();
      if (loaded) {
        console.log('[Game] セーブデータを読み込みました');
      } else {
        console.log('[Game] 新規ゲーム開始');
        State.reset();
      }

      // 4. Stats更新（Lifespanは Stats.update内で処理）
      Stats.update();

      // 5. テーマ適用
      ThemeManager.apply(Config.get('theme'));

      // 6. UI初期化
      UIManager.init();
      UIManager.showTab('status');

      // 7. ゲームループ開始
      GameLoop.setSpeed(Config.get('speed') || 1);
      GameLoop.start();

      // 8. オートセーブ開始
      AutoSave.start();
      AutoSave.setupUnloadSave();

      // 9. オフライン進行処理
      if (Config.get('offlineProgress') && loaded) {
        OfflineProgress.process();
      }

      // 10. イベント登録
      this._registerEvents();

      // 11. 初回メッセージ
      if (!loaded) {
        setTimeout(() => {
          Notification.show('Reborn Infinity へようこそ！', '名もなき村人として新たな人生を歩もう。', 'accent');
        }, 500);
      }

      console.log('[Game] 初期化完了');

    } catch (e) {
      console.error('[Game] 初期化エラー:', e);
      this._showErrorScreen(e);
    }
  },

  _registerEvents() {
    EventBus.on(GAME_EVENTS.LIFESPAN_END, () => {
      UIManager.showRebirthNotice();
    });

    EventBus.on(GAME_EVENTS.JOB_LEVEL_UP, function(data) {
      if (Config.get('showLevelUpNotif')) {
        Notification.show(data.jobName + ' Lv.' + data.level + '！', 'レベルアップ！', 'success');
      }
    });

    EventBus.on(GAME_EVENTS.SKILL_LEVEL_UP, function(data) {
      if (Config.get('showLevelUpNotif')) {
        Notification.show(data.skillName + ' Lv.' + data.level + '！', 'スキルレベルアップ！', 'accent');
      }
    });

    EventBus.on(GAME_EVENTS.ACHIEVEMENT_UNLOCK, function(data) {
      if (Config.get('showAchievNotif')) {
        Notification.show('実績解除:「' + data.name + '」', data.title ? '称号: ' + data.title : '', 'gold');
      }
    });

    EventBus.on(GAME_EVENTS.REBIRTH, function(data) {
      Notification.show('転生 ' + data.count + '回目！', 'XPボーナス: x' + (data.bonus || 1).toFixed(2), 'accent');
      ThemeManager.setTierTheme(G.tier || 0);
    });

    EventBus.on(GAME_EVENTS.TIER_UP, function(data) {
      Notification.show('Tier ' + data.tier + ': ' + data.name + ' 解放！', '新たな力に目覚めた！', 'gold');
      ThemeManager.setTierTheme(data.tier);
    });

    EventBus.on(GAME_EVENTS.QUEST_COMPLETE, function(data) {
      Notification.show('クエスト達成！', data.questId || '', 'success');
    });

    EventBus.on(GAME_EVENTS.BATTLE_WIN, function(data) {
      // 戦闘勝利はログのみ（過剰通知防止）
    });
  },

  _showErrorScreen(error) {
    document.body.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'min-height:100vh;background:#070914;color:#dfe4ff;font-family:sans-serif;gap:16px;padding:24px;text-align:center">' +
      '<div style="font-size:48px">⚠️</div>' +
      '<h1 style="font-size:20px;color:#f3d98a;">初期化エラー</h1>' +
      '<p style="color:#8b93c9;font-size:14px;max-width:400px;">ゲームの起動中にエラーが発生しました。<br>キャッシュをクリアして再読み込みしてください。</p>' +
      '<pre style="background:#0d1126;border:1px solid #2a3470;border-radius:8px;padding:12px;font-size:11px;color:#ef4444;' +
      'max-width:480px;overflow:auto;text-align:left;white-space:pre-wrap">' +
      (error.message || '') + '\n' + (error.stack || '') + '</pre>' +
      '<button onclick="location.reload()" style="padding:10px 24px;background:#4ade80;color:#070914;' +
      'border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer">再読み込み</button>' +
      '</div>';
  },

  save() {
    SaveManager.save();
    Notification.show('セーブしました', '', 'info');
  },

  hardReset() {
    if (!confirm('本当にリセットしますか？すべてのデータが消去されます。')) return;
    SaveManager.deleteSave();
    location.reload();
  },

};

document.addEventListener('DOMContentLoaded', function() {
  Game.init();
});
