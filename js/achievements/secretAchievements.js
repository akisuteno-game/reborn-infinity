/* js/achievements/secretAchievements.js */
const SECRET_ACHIEVEMENTS = [
  { id: 'secret_1', name: '???', desc: '隠された実績',  icon: '🔒', rarity: 'legend', points: 200, check: g => g.battle.dragonKills >= 10 && g.rebirth.count >= 5, title: '竜の王' },
  { id: 'secret_2', name: '???', desc: '隠された実績',  icon: '🔒', rarity: 'divine', points: 500, check: g => g.tier >= 15, title: '創造主' },
];
Object.freeze(SECRET_ACHIEVEMENTS);
