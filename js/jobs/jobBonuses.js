/* ============================================
   Reborn Infinity - js/jobs/jobBonuses.js
   職業ボーナス計算
   ============================================ */

const JobBonuses = {

  // 現在の職業データを取得
  getCurrent() {
    return JobUnlocks.getById(G.jobs.current);
  },

  // 職業レベルに応じたボーナス倍率（レベルが上がるほど強くなる）
  getLevelMult(jobId) {
    const lv = G.jobs.levels[jobId] || 1;
    return 1 + (lv - 1) * 0.02; // Lv1で×1.0、Lv10で×1.18、Lv50で×1.98
  },

  // ATKボーナス
  getAtkBonus() {
    const job = this.getCurrent();
    if (!job || !job.bonuses.atk) return 0;
    return job.bonuses.atk * this.getLevelMult(job.id);
  },

  // DEFボーナス
  getDefBonus() {
    const job = this.getCurrent();
    if (!job || !job.bonuses.def) return 0;
    return job.bonuses.def * this.getLevelMult(job.id);
  },

  // HPボーナス
  getHpBonus() {
    const job = this.getCurrent();
    if (!job || !job.bonuses.hp) return 0;
    return job.bonuses.hp * this.getLevelMult(job.id);
  },

  // コイン倍率ボーナス
  getCoinBonus() {
    const job = this.getCurrent();
    if (!job || !job.bonuses.coin) return 0;
    return job.bonuses.coin * this.getLevelMult(job.id);
  },

  // XP倍率ボーナス
  getXpBonus() {
    const job = this.getCurrent();
    if (!job || !job.bonuses.xp) return 0;
    return job.bonuses.xp * this.getLevelMult(job.id);
  },

  // 素材倍率ボーナス
  getMatBonus() {
    const job = this.getCurrent();
    if (!job || !job.bonuses.mat) return 0;
    return job.bonuses.mat * this.getLevelMult(job.id);
  },

  // 探索ボーナス
  getExploreBonus() {
    const job = this.getCurrent();
    if (!job || !job.bonuses.explore) return 0;
    return job.bonuses.explore * this.getLevelMult(job.id);
  },

  // 汎用ボーナス取得
  getBonus(stat) {
    const job = this.getCurrent();
    if (!job || !job.bonuses[stat]) return 0;
    return job.bonuses[stat] * this.getLevelMult(job.id);
  },

};
