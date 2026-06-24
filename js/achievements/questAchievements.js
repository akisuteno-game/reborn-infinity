/* js/achievements/questAchievements.js */
const QUEST_ACHIEVEMENTS = [
  { id: 'quest_1', name: '初クリア',   desc: 'クエストを1つクリアする',   icon: '📜', rarity: 'common',   points: 5,  check: g => g.quests.completed.length >= 1 },
  { id: 'quest_2', name: 'クエスター', desc: 'クエストを10個クリアする',  icon: '📋', rarity: 'uncommon', points: 30, check: g => g.quests.completed.length >= 10 },
];
Object.freeze(QUEST_ACHIEVEMENTS);
