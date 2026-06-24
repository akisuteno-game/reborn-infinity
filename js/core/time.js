/* ============================================
   Reborn Infinity - js/core/time.js
   時間・年齢・寿命管理
   ============================================ */

const TimeSystem = {

  // ===== 初期化 =====
  init() {
    this._lastSaveTime = Date.now();
  },

  // ===== ティック処理（1ティック = 1日） =====
  tick(G) {
    G.time.day++;
    if (G.time.day >= CONSTANTS.DAYS_PER_YEAR) {
      G.time.day = 0;
      G.time.age++;
      this._onYearPass(G);
    }
    G.time.totalDays++;
    G.time.totalTicks++;
    this._checkLifespan(G);
  },

  // ===== 1年経過時の処理 =====
  _onYearPass(G) {
    // HP・MP緩やか回復
    G.battle.hp = Math.min(G.battle.maxHp, G.battle.hp + 10);
    G.battle.mp = Math.min(G.battle.maxMp, G.battle.mp + 2);
    // イベント通知
    EventBus.emit('yearPassed', { age: G.time.age });
  },

  // ===== 寿命チェック =====
  _checkLifespan(G) {
    if (G.time.age >= G.time.lifespan && !G.time.isDead) {
      G.time.isDead = true;
      EventBus.emit('lifespanEnd', {});
    }
  },

  // ===== 年齢バーパーセント =====
  getAgePct(G) {
    const passedDays = (G.time.age - CONSTANTS.START_AGE) * CONSTANTS.DAYS_PER_YEAR + G.time.day;
    const totalDays  = (G.time.lifespan - CONSTANTS.START_AGE) * CONSTANTS.DAYS_PER_YEAR;
    return MathUtil.clamp(passedDays / totalDays * 100, 0, 100);
  },

  // ===== 残り寿命（日） =====
  getRemainingDays(G) {
    const totalDaysLived = (G.time.age - CONSTANTS.START_AGE) * CONSTANTS.DAYS_PER_YEAR + G.time.day;
    const totalDaysLife  = (G.time.lifespan - CONSTANTS.START_AGE) * CONSTANTS.DAYS_PER_YEAR;
    return Math.max(0, totalDaysLife - totalDaysLived);
  },

  // ===== オフライン経過時間の計算 =====
  calcOfflineTime(savedTimestamp) {
    const now = Date.now();
    const elapsedMs = now - savedTimestamp;
    return MathUtil.calcOfflineTicks(elapsedMs);
  },

  // ===== 現在タイムスタンプ =====
  now() {
    return Date.now();
  },

};
