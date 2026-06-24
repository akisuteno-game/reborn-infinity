/* ============================================
   Reborn Infinity - js/skills/skillUnlocks.js
   スキル解放条件チェック
   ============================================ */

const SkillUnlocks = {

  // 全スキルデータ（結合済み）
  getAllSkills() {
    return [
      ...COMBAT_SKILLS,
      ...GATHER_SKILLS,
      ...CRAFT_SKILLS,
      ...MAGIC_SKILLS,
      ...LIFE_SKILLS,
      ...DIVINE_SKILLS,
      ...CONCEPT_SKILLS,
    ];
  },

  getById(id) {
    return this.getAllSkills().find(s => s.id === id);
  },

  isUnlocked(skillId) {
    return G.skills.unlocked.includes(skillId);
  },

  canUnlock(skillId) {
    const skill = this.getById(skillId);
    if (!skill) return false;
    if (this.isUnlocked(skillId)) return true;

    // 名声チェック
    if (skill.reqFame && G.resources.fame < skill.reqFame) return false;

    // 転生回数チェック
    if (skill.reqRebirth && G.rebirth.count < skill.reqRebirth) return false;

    // Tierチェック
    if (skill.reqTier && G.tier < skill.reqTier) return false;

    // スキルレベルチェック
    if (skill.reqSkill) {
      for (const [reqId, reqLv] of Object.entries(skill.reqSkill)) {
        if ((G.skills.levels[reqId] || 1) < reqLv) return false;
      }
    }

    return true;
  },

  unlock(skillId) {
    if (this.isUnlocked(skillId)) return false;
    if (!this.canUnlock(skillId)) return false;
    G.skills.unlocked.push(skillId);
    EventBus.emit(GAME_EVENTS.SKILL_LEARNED, { skillId });
    return true;
  },

  checkAll() {
    for (const skill of this.getAllSkills()) {
      if (!this.isUnlocked(skill.id) && this.canUnlock(skill.id)) {
        this.unlock(skill.id);
      }
    }
  },

  getUnlocked() {
    return this.getAllSkills().filter(s => this.isUnlocked(s.id));
  },

  getVisible() {
    return this.getAllSkills().filter(s => {
      if (this.isUnlocked(s.id)) return true;
      if (s.reqTier && G.tier < s.reqTier - 1) return false;
      if (s.reqRebirth && G.rebirth.count < s.reqRebirth - 1) return false;
      return true;
    });
  },

};
