/* js/achievements/skillAchievements.js */
const SKILL_ACHIEVEMENTS = [
  { id: 'skill_1', name: 'スキル習得',    desc: 'スキルをLv5にする',         icon: '📖', rarity: 'common',   points: 5,  check: g => Object.values(g.skills.levels).some(v=>v>=5) },
  { id: 'skill_2', name: 'スキルマスター',desc: 'スキルをLv30にする',        icon: '✨', rarity: 'rare',     points: 30, check: g => Object.values(g.skills.levels).some(v=>v>=30) },
  { id: 'skill_3', name: '全スキル習得',  desc: '10種類のスキルを解放する',  icon: '🌟', rarity: 'epic',     points: 60, check: g => g.skills.unlocked.length >= 10 },
  { id: 'skill_4', name: 'シナジー発動',  desc: 'スキルシナジーを発動する',  icon: '💫', rarity: 'uncommon', points: 20, check: g => SkillSynergy.getActive().length > 0 },
];
Object.freeze(SKILL_ACHIEVEMENTS);
