/* js/achievements/lifeAchievements.js */
const LIFE_ACHIEVEMENTS = [
  { id: 'life_1',   name: '人生の始まり',    desc: 'ゲームを開始する',           icon: '🏠', rarity: 'common',   points: 5,  check: g => g.meta.playTime > 0 },
  { id: 'life_2',   name: '20歳',            desc: '20歳に到達する',             icon: '🎂', rarity: 'common',   points: 5,  check: g => g.time.age >= 20 },
  { id: 'life_3',   name: '壮年',            desc: '40歳に到達する',             icon: '🎂', rarity: 'common',   points: 10, check: g => g.time.age >= 40 },
  { id: 'life_4',   name: '老人',            desc: '60歳に到達する',             icon: '🧓', rarity: 'uncommon', points: 15, check: g => g.time.age >= 60 },
  { id: 'life_5',   name: '長老',            desc: '寿命まで生きる',             icon: '💀', rarity: 'uncommon', points: 20, check: g => g.time.isDead },
  { id: 'life_6',   name: '大富豪',          desc: 'コインを10000枚貯める',      icon: '💰', rarity: 'rare',     points: 30, check: g => g.resources.totalCoinsEarned >= 10000 },
  { id: 'life_7',   name: '超大富豪',        desc: 'コインを1000000枚貯める',    icon: '💎', rarity: 'epic',     points: 50, check: g => g.resources.totalCoinsEarned >= 1000000 },
  { id: 'life_8',   name: '名声人',          desc: '名声を1000獲得する',         icon: '⭐', rarity: 'rare',     points: 30, check: g => g.resources.fame >= 1000 },
];
Object.freeze(LIFE_ACHIEVEMENTS);
