/* js/achievements/achievementManager.js */
const AchievementManager = {
  _all() {
    return [
      ...LIFE_ACHIEVEMENTS, ...JOB_ACHIEVEMENTS, ...SKILL_ACHIEVEMENTS,
      ...COMBAT_ACHIEVEMENTS, ...EXPLORATION_ACHIEVEMENTS, ...QUEST_ACHIEVEMENTS,
      ...EQUIPMENT_ACHIEVEMENTS, ...REBIRTH_ACHIEVEMENTS, ...COLLECTION_ACHIEVEMENTS,
      ...CHALLENGE_ACHIEVEMENTS, ...SECRET_ACHIEVEMENTS,
    ];
  },
  check(G) {
    for (const ach of this._all()) {
      if (G.achievements.unlocked.includes(ach.id)) continue;
      try { if (!ach.check(G)) continue; } catch(e) { continue; }
      G.achievements.unlocked.push(ach.id);
      G.achievements.totalPoints += ach.points || 0;
      if (ach.title && !G.titles.unlocked.includes(ach.title)) {
        G.titles.unlocked.push(ach.title);
        if (!G.titles.equipped) G.titles.equipped = ach.title;
      }
      EventBus.emit(GAME_EVENTS.ACHIEVEMENT_UNLOCK, { id: ach.id, name: ach.name, title: ach.title });
      Notification.log('🏆実績解除:「' + ach.name + '」' + (ach.title ? ' 称号:' + ach.title : ''));
    }
  },
  getAll()       { return this._all().map(a => ({ ...a, unlocked: G.achievements.unlocked.includes(a.id) })); },
  getUnlocked()  { return this._all().filter(a => G.achievements.unlocked.includes(a.id)); },
  getTotalPoints(){ return G.achievements.totalPoints; },
};
