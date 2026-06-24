/* js/achievements/collectionAchievements.js */
const COLLECTION_ACHIEVEMENTS = [
  { id: 'col_1', name: '図鑑デビュー',  desc: '敵を5種類図鑑に登録する',   icon: '📚', rarity: 'common',   points: 10, check: g => g.collection.enemies.length >= 5 },
  { id: 'col_2', name: '図鑑コレクター',desc: '敵を15種類図鑑に登録する',  icon: '📖', rarity: 'rare',     points: 40, check: g => g.collection.enemies.length >= 15 },
];
Object.freeze(COLLECTION_ACHIEVEMENTS);
