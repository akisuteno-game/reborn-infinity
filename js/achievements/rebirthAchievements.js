/* js/achievements/rebirthAchievements.js */
const REBIRTH_ACHIEVEMENTS = [
  { id: 'rebirth_1', name: '輪廻',         desc: '初めて転生する',       icon: '♻️', rarity: 'rare',   points: 50,  check: g => g.rebirth.count >= 1,   title: '転生者' },
  { id: 'rebirth_2', name: '永遠の旅人',   desc: '5回転生する',          icon: '∞',  rarity: 'epic',   points: 100, check: g => g.rebirth.count >= 5,   title: '永遠の旅人' },
  { id: 'rebirth_3', name: '輪廻の達人',   desc: '10回転生する',         icon: '🌀', rarity: 'legend', points: 200, check: g => g.rebirth.count >= 10,  title: '輪廻の達人' },
  { id: 'rebirth_4', name: '転生の神',     desc: '100回転生する',        icon: '🌟', rarity: 'divine', points: 500, check: g => g.rebirth.count >= 100, title: '転生の神' },
];
Object.freeze(REBIRTH_ACHIEVEMENTS);
