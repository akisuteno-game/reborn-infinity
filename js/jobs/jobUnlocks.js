/* ============================================
   Reborn Infinity - js/jobs/jobUnlocks.js
   職業解放条件チェック
   ============================================ */

const JobUnlocks = {

  // 全職業データ（結合済み）
  getAllJobs() {
    return [
      ...VILLAGER_JOBS,
      ...APPRENTICE_JOBS,
      ...ADVANCED_JOBS,
      ...ELITE_JOBS,
      ...HERO_JOBS,
      ...DIVINE_JOBS,
      ...CONCEPT_JOBS,
      ...CREATOR_JOBS,
    ];
  },

  // IDから職業を取得
  getById(id) {
    return this.getAllJobs().find(j => j.id === id);
  },

  // 解放済みかチェック
  isUnlocked(jobId) {
    return G.jobs.unlocked.includes(jobId);
  },

  // 解放条件を満たしているかチェック
  canUnlock(jobId) {
    const job = this.getById(jobId);
    if (!job) return false;
    if (this.isUnlocked(jobId)) return true;

    // 名声チェック
    if (job.reqFame && G.resources.fame < job.reqFame) return false;

    // 転生回数チェック
    if (job.reqRebirth && G.rebirth.count < job.reqRebirth) return false;

    // Tierチェック
    if (job.reqTier && G.tier < job.reqTier) return false;

    // 職業レベルチェック
    if (job.reqLevel) {
      for (const [reqJobId, reqLv] of Object.entries(job.reqLevel)) {
        if ((G.jobs.levels[reqJobId] || 1) < reqLv) return false;
      }
    }

    return true;
  },

  // 解放処理
  unlock(jobId) {
    if (this.isUnlocked(jobId)) return false;
    if (!this.canUnlock(jobId)) return false;
    G.jobs.unlocked.push(jobId);
    EventBus.emit(GAME_EVENTS.JOB_UNLOCKED, { jobId });
    return true;
  },

  // 解放可能な職業を全チェック（毎ティック呼ばれる）
  checkAll() {
    const all = this.getAllJobs();
    for (const job of all) {
      if (!this.isUnlocked(job.id) && this.canUnlock(job.id)) {
        this.unlock(job.id);
      }
    }
  },

  // 解放済み職業一覧（表示用）
  getUnlocked() {
    return this.getAllJobs().filter(j => this.isUnlocked(j.id));
  },

  // 未解放だが条件が見えている職業
  getVisible() {
    const all = this.getAllJobs();
    return all.filter(j => {
      if (this.isUnlocked(j.id)) return true;
      // Tier・転生チェック（高すぎるTierは非表示）
      if (j.reqTier && G.tier < j.reqTier - 1) return false;
      if (j.reqRebirth && G.rebirth.count < j.reqRebirth - 1) return false;
      return true;
    });
  },

};
