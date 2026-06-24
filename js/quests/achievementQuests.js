/* js/quests/achievementQuests.js */
const ACHIEVEMENT_QUEST_DATA = [
  { id: 'ach_10',   name: '実績コレクター',  desc: '実績を10個解除する',  cond: g => g.achievements.unlocked.length >= 10,  reward: { coin: 1000, mat: 100 } },
  { id: 'ach_50',   name: '実績マニア',      desc: '実績を50個解除する',  cond: g => g.achievements.unlocked.length >= 50,  reward: { coin: 5000, mat: 500 } },
  { id: 'ach_100',  name: '実績の達人',      desc: '実績を100個解除する', cond: g => g.achievements.unlocked.length >= 100, reward: { coin: 20000, mat: 2000 } },
];
Object.freeze(ACHIEVEMENT_QUEST_DATA);
