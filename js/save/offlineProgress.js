/* ============================================
   Reborn Infinity - js/save/offlineProgress.js
   オフライン進行処理
   ============================================ */

const OfflineProgress = {

  // ===== オフライン進行を処理 =====
  process() {
    const lastSaved = G.meta.lastSaved;
    if (!lastSaved) return;

    const elapsed   = Date.now() - lastSaved;
    const ticks     = MathUtil.calcOfflineTicks(elapsed);

    if (ticks <= 0) return;

    console.log(`[OfflineProgress] ${ticks}ティック分の進行を処理中...`);

    // オフライン進行（簡易版：コイン・XPのみ）
    const result = this._simulate(ticks);

    // 結果を表示
    this._showResult(elapsed, result);
  },

  // ===== 簡易シミュレーション =====
  _simulate(ticks) {
    const result = {
      coins:    0,
      xp:       0,
      fame:     0,
      ticks,
    };

    const job = G.jobs.current;
    const jobData = typeof JOB_DATA !== 'undefined'
      ? JOB_DATA.find(j => j.id === job)
      : null;

    if (jobData) {
      const coinPerTick = jobData.income * Stats.getCoinMult() / CONSTANTS.DAYS_PER_YEAR;
      result.coins = coinPerTick * ticks;
      G.resources.coins += result.coins;
      G.resources.totalCoinsEarned += result.coins;
    }

    // XP（職業・スキル）
    const xpPerTick = CONSTANTS.XP_PER_TICK_JOB * Stats.getXpMult();
    result.xp = xpPerTick * ticks;

    return result;
  },

  // ===== 結果表示 =====
  _showResult(elapsedMs, result) {
    const hours = Math.floor(elapsedMs / 3600000);
    const mins  = Math.floor((elapsedMs % 3600000) / 60000);
    const timeStr = hours > 0 ? `${hours}時間${mins}分` : `${mins}分`;

    if (typeof Notification !== 'undefined') {
      Notification.show(
        `オフライン進行 (${timeStr})`,
        `コイン +${NumberUtil.format(result.coins)}`,
        'info'
      );
    }
  },

};
