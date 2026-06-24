/* js/achievements/challengeAchievements.js */
const CHALLENGE_ACHIEVEMENTS = [
  { id: 'chal_1', name: '高速転生',   desc: '生まれてから30日以内に転生する', icon: '⚡', rarity: 'epic',   points: 100, check: g => g.rebirth.count >= 1 && g.time.totalDays <= 30 },
  { id: 'chal_2', name: '長命転生',   desc: '寿命を80年以上にして転生する',   icon: '⏳', rarity: 'rare',   points: 60,  check: g => g.rebirth.count >= 1 && g.time.lifespan >= 80 },
];
Object.freeze(CHALLENGE_ACHIEVEMENTS);
