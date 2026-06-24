/* ============================================
   Reborn Infinity - js/jobs/jobManager.js
   職業システム統括マネージャー
   ============================================ */

const JobManager = {

  // ===== 毎ティック処理 =====
  tick(G) {
    const jobId = G.jobs.current;
    const job   = JobUnlocks.getById(jobId);
    if (!job) return;

    // XP加算
    const xpGain = CONSTANTS.XP_PER_TICK_JOB * Stats.getXpMult();
    JobExp.addXp(jobId, xpGain);

    // コイン加算
    const coinGain = job.income * Stats.getCoinMult() / CONSTANTS.DAYS_PER_YEAR;
    Resources.addCoins(coinGain);

    // 名声加算（微量）
    G.resources.fame += 0.015 * Stats.getFameMult();

    // 素材加算（採集系）
    if (['gather', 'explore'].includes(job.category)) {
      Resources.addMaterials(0.01 * Stats.getMatMult());
    }
  },

  // ===== 職業を変更 =====
  select(jobId) {
    if (!JobUnlocks.isUnlocked(jobId)) return false;
    if (G.jobs.current === jobId) return false;

    const prev = G.jobs.current;
    G.jobs.current = jobId;
    G.jobs.changed++;

    EventBus.emit(GAME_EVENTS.JOB_CHANGED, {
      from: prev,
      to:   jobId,
    });

    // 職業解放チェック
    JobUnlocks.checkAll();
    return true;
  },

  // ===== ボーナス取得（Stats.jsから呼ばれる） =====
  getAtkBonus()     { return JobBonuses.getAtkBonus(); },
  getDefBonus()     { return JobBonuses.getDefBonus(); },
  getHpBonus()      { return JobBonuses.getHpBonus(); },
  getCoinBonus()    { return JobBonuses.getCoinBonus(); },
  getXpBonus()      { return JobBonuses.getXpBonus(); },
  getMatBonus()     { return JobBonuses.getMatBonus(); },
  getExploreBonus() { return JobBonuses.getExploreBonus(); },

  // ===== 現在の職業データ =====
  getCurrent() {
    return JobUnlocks.getById(G.jobs.current);
  },

  // ===== 転生時リセット =====
  resetOnRebirth() {
    // XPリセット、レベルは引き継がない
    const allJobs = JobUnlocks.getAllJobs();
    allJobs.forEach(j => {
      G.jobs.levels[j.id] = 1;
      G.jobs.xp[j.id]     = 0;
    });
    G.jobs.current  = 'villager';
    G.jobs.unlocked = ['villager'];
    JobUnlocks.checkAll();
  },

  // ===== UI用：表示する職業リスト =====
  getDisplayList() {
    return JobUnlocks.getVisible().map(job => ({
      ...job,
      level:     G.jobs.levels[job.id] || 1,
      xp:        G.jobs.xp[job.id] || 0,
      xpReq:     JobExp.getRequired(job.id, G.jobs.levels[job.id] || 1),
      xpPct:     JobExp.getPct(job.id),
      isActive:  G.jobs.current === job.id,
      isUnlocked: JobUnlocks.isUnlocked(job.id),
      canUnlock:  JobUnlocks.canUnlock(job.id),
    }));
  },

};

// JOB_DATA としてエクスポート（他モジュールから参照）
const JOB_DATA = [
  ...VILLAGER_JOBS,
  ...APPRENTICE_JOBS,
  ...ADVANCED_JOBS,
  ...ELITE_JOBS,
  ...HERO_JOBS,
  ...DIVINE_JOBS,
  ...CONCEPT_JOBS,
  ...CREATOR_JOBS,
];
