/* ============================================
   Reborn Infinity - js/skills/skillManager.js
   スキルシステム統括マネージャー
   ============================================ */

const SkillManager = {

  // ===== 毎ティック処理 =====
  tick(G) {
    const skillId = G.skills.current;
    const skill   = SkillUnlocks.getById(skillId);
    if (!skill) return;

    const xpGain = CONSTANTS.XP_PER_TICK_SKILL * this.getXpMult();
    this._addXp(skillId, xpGain);
  },

  // ===== XP加算・レベルアップ =====
  _addXp(skillId, amount) {
    if (!G.skills.xp[skillId])     G.skills.xp[skillId]     = 0;
    if (!G.skills.levels[skillId]) G.skills.levels[skillId] = 1;

    G.skills.xp[skillId] += amount;

    while (true) {
      const lv  = G.skills.levels[skillId];
      if (lv >= CONSTANTS.SKILL_MAX_LEVEL) break;
      const req = this._xpRequired(skillId, lv);
      if (G.skills.xp[skillId] < req) break;
      G.skills.xp[skillId]  -= req;
      G.skills.levels[skillId]++;
      this._onLevelUp(skillId, G.skills.levels[skillId]);
    }
  },

  _xpRequired(skillId, level) {
    const skill = SkillUnlocks.getById(skillId);
    if (!skill) return 9999;
    return MathUtil.skillXpRequired(skill.xpBase, level);
  },

  _onLevelUp(skillId, newLevel) {
    const skill = SkillUnlocks.getById(skillId);
    if (!skill) return;
    Stats.update();
    EventBus.emit(GAME_EVENTS.SKILL_LEVEL_UP, {
      skillId,
      skillName: skill.name,
      level:     newLevel,
    });
    SkillUnlocks.checkAll();
  },

  // ===== スキルを選択 =====
  select(skillId) {
    if (!SkillUnlocks.isUnlocked(skillId)) return false;
    G.skills.current = skillId;
    return true;
  },

  // ===== ステータスボーナス =====
  getStatBonus(stat) {
    let total = 0;
    for (const skillId of G.skills.unlocked) {
      const skill = SkillUnlocks.getById(skillId);
      if (!skill) continue;
      const lv = G.skills.levels[skillId] || 1;
      if (skill.effect.stat === stat)  total += skill.effect.perLevel  * (lv - 1);
      if (skill.effect.stat2 === stat) total += skill.effect.perLevel2 * (lv - 1);
    }
    // シナジーボーナス
    total += SkillSynergy.getBonus(stat);
    return total;
  },

  getXpMult() {
    let mult = 1 + this.getStatBonus('xp');
    mult += SkillSynergy.getBonus('xp');
    return Math.max(0.1, mult);
  },

  getCoinMult() {
    let mult = 1 + this.getStatBonus('coin');
    return Math.max(0.1, mult);
  },

  getFameMult() {
    let mult = 1 + this.getStatBonus('fame');
    return Math.max(0.1, mult);
  },

  getMatMult() {
    let mult = 1 + this.getStatBonus('mat');
    return Math.max(0.1, mult);
  },

  // ===== 転生時リセット =====
  resetOnRebirth() {
    SkillUnlocks.getAllSkills().forEach(s => {
      G.skills.levels[s.id] = 1;
      G.skills.xp[s.id]     = 0;
    });
    G.skills.current  = 'strength';
    G.skills.unlocked = ['strength', 'agility', 'wisdom', 'gathering', 'crafting'];
    SkillUnlocks.checkAll();
  },

  // ===== UI用 =====
  getDisplayList() {
    return SkillUnlocks.getVisible().map(skill => ({
      ...skill,
      level:      G.skills.levels[skill.id] || 1,
      xp:         G.skills.xp[skill.id] || 0,
      xpReq:      this._xpRequired(skill.id, G.skills.levels[skill.id] || 1),
      xpPct:      MathUtil.pct(G.skills.xp[skill.id] || 0, this._xpRequired(skill.id, G.skills.levels[skill.id] || 1)),
      isActive:   G.skills.current === skill.id,
      isUnlocked: SkillUnlocks.isUnlocked(skill.id),
      canUnlock:  SkillUnlocks.canUnlock(skill.id),
    }));
  },

  getActiveSynergies() {
    return SkillSynergy.getActive();
  },

};

// SKILL_DATA としてエクスポート
const SKILL_DATA = [
  ...COMBAT_SKILLS,
  ...GATHER_SKILLS,
  ...CRAFT_SKILLS,
  ...MAGIC_SKILLS,
  ...LIFE_SKILLS,
  ...DIVINE_SKILLS,
  ...CONCEPT_SKILLS,
];
