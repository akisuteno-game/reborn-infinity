/* ============================================
   Reborn Infinity - js/core/gameloop.js
   メインゲームループ
   ============================================ */

const GameLoop = {

  _intervalId:   null,
  _paused:       false,
  _speed:        1,
  _lastTickTime: 0,
  _tickCount:    0,

  // ===== 開始 =====
  start() {
    if (this._intervalId) this.stop();
    this._lastTickTime = Date.now();
    this._intervalId = setInterval(() => this._tick(), CONSTANTS.TICK_INTERVAL_MS);
    console.log('[GameLoop] Started');
  },

  // ===== 停止 =====
  stop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  },

  // ===== 一時停止 =====
  pause() {
    this._paused = true;
    EventBus.emit('gamePaused', {});
  },

  resume() {
    this._paused = false;
    EventBus.emit('gameResumed', {});
  },

  togglePause() {
    if (this._paused) this.resume();
    else              this.pause();
    return this._paused;
  },

  isPaused() {
    return this._paused;
  },

  // ===== スピード設定 =====
  setSpeed(speed) {
    if (!CONSTANTS.SPEED_OPTIONS.includes(speed)) return;
    this._speed = speed;
    Config.set('speed', speed);
    EventBus.emit('speedChanged', { speed });
  },

  getSpeed() {
    return this._speed;
  },

  // ===== メインティック =====
  _tick() {
    if (this._paused) return;
    if (G.time.isDead) return;

    // speed分だけティックを回す
    for (let i = 0; i < this._speed; i++) {
      this._processTick();
    }

    // UI更新
    UIManager.render();

    // プレイ時間加算
    G.meta.playTime += this._speed;
    G.stats.totalPlayTicks += this._speed;
    this._tickCount++;
  },

  // ===== 1ティック処理 =====
  _processTick() {
    // 時間進行
    TimeSystem.tick(G);

    // 職業XP
    JobManager.tick(G);

    // スキルXP
    SkillManager.tick(G);

    // 探索
    ExplorationManager.tick(G);

    // 戦闘（オートの場合）
    if (G.automation.explore || Config.get('autoBattle')) {
      CombatManager.tick(G);
    }

    // ペット
    PetManager.tick(G);

    // HP自然回復
    this._regenTick(G);

    // 実績チェック
    AchievementManager.check(G);

    // クエスト更新
    QuestManager.tick(G);

    // イベント
    EventManager.tick(G);

    // オートメーション
    AutomationSystem.tick(G);
  },

  // ===== 自然回復ティック =====
  _regenTick(G) {
    // HP: 毎日少しずつ回復
    if (G.battle.hp < G.battle.maxHp) {
      G.battle.hp = Math.min(
        G.battle.maxHp,
        G.battle.hp + G.battle.maxHp * 0.0002
      );
    }
    // MP: HPより速く回復
    if (G.battle.mp < G.battle.maxMp) {
      G.battle.mp = Math.min(
        G.battle.maxMp,
        G.battle.mp + G.battle.maxMp * 0.0005
      );
    }
  },

};
