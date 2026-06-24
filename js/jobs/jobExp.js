/* ============================================
   Reborn Infinity - js/jobs/jobExp.js
   職業XP・レベルアップ処理
   ============================================ */

const JobExp = {

  // XP必要量
  getRequired(jobId, level) {
    const job = JobUnlocks.getById(jobId);
    if (!job) return 9999;
    return MathUtil.jobXpRequired(job.xpBase, level);
  },

  // XPを加算してレベルアップ処理
  addXp(jobId, amount) {
    if (!G.jobs.xp[jobId] && G.jobs.xp[jobId] !== 0) G.jobs.xp[jobId] = 0;
    if (!G.jobs.levels[jobId]) G.jobs.levels[jobId] = 1;

    G.jobs.xp[jobId] += amount;

    // レベルアップチェック（複数回レベルアップ対応）
    let leveled = false;
    while (true) {
      const lv  = G.jobs.levels[jobId];
      if (lv >= CONSTANTS.JOB_MAX_LEVEL) break;
      const req = this.getRequired(jobId, lv);
      if (G.jobs.xp[jobId] < req) break;
      G.jobs.xp[jobId] -= req;
      G.jobs.levels[jobId]++;
      leveled = true;
      this._onLevelUp(jobId, G.jobs.levels[jobId]);
    }

    return leveled;
  },

  // レベルアップ時の処理
  _onLevelUp(jobId, newLevel) {
    const job = JobUnlocks.getById(jobId);
    if (!job) return;

    // 名声ボーナス
    G.resources.fame += 5 * Stats.getFameMult();

    // 魔法ポイント（10レベルごと）
    if (newLevel % 10 === 0 && G.tier >= 1) {
      G.prestige?.rebirth?.magicPoints && (G.prestige.rebirth.magicPoints++);
    }

    // イベント発火
    EventBus.emit(GAME_EVENTS.JOB_LEVEL_UP, {
      jobId,
      jobName: job.name,
      level:   newLevel,
    });

    // 職業解放チェック
    JobUnlocks.checkAll();
  },

  // パーセント取得（バー表示用）
  getPct(jobId) {
    const lv  = G.jobs.levels[jobId] || 1;
    const xp  = G.jobs.xp[jobId] || 0;
    const req = this.getRequired(jobId, lv);
    return MathUtil.pct(xp, req);
  },

  // XP表示テキスト
  getText(jobId) {
    const lv  = G.jobs.levels[jobId] || 1;
    const xp  = G.jobs.xp[jobId] || 0;
    const req = this.getRequired(jobId, lv);
    return NumberUtil.xp(xp, req);
  },

};
