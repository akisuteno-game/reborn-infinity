/* js/achievements/explorationAchievements.js */
const EXPLORATION_ACHIEVEMENTS = [
  { id: 'exp_1', name: '初探索',    desc: '初めて探索する',            icon: '🗺️', rarity: 'common',   points: 5,  check: g => g.explore.totalExplored >= 1 },
  { id: 'exp_2', name: '冒険家',    desc: '10回探索を完了する',        icon: '🧭', rarity: 'uncommon', points: 20, check: g => g.explore.totalExplored >= 10 },
  { id: 'exp_3', name: '世界探検家',desc: '5つのエリアを訪問する',     icon: '🌍', rarity: 'rare',     points: 40, check: g => g.explore.visited.length >= 5 },
  { id: 'exp_4', name: '全域踏破',  desc: '10のエリアを訪問する',      icon: '🌏', rarity: 'epic',     points: 80, check: g => g.explore.visited.length >= 10 },
];
Object.freeze(EXPLORATION_ACHIEVEMENTS);
