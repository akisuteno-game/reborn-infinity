/* js/achievements/combatAchievements.js */
const COMBAT_ACHIEVEMENTS = [
  { id: 'combat_1', name: '初討伐',         desc: '敵を1体倒す',          icon: '🗡️', rarity: 'common',   points: 5,  check: g => g.battle.totalKills >= 1,   title: '戦士' },
  { id: 'combat_2', name: '怪物退治',       desc: '敵を50体倒す',         icon: '🏹', rarity: 'uncommon', points: 20, check: g => g.battle.totalKills >= 50,  title: 'モンスターハンター' },
  { id: 'combat_3', name: '百戦錬磨',       desc: '敵を100体倒す',        icon: '⚔️', rarity: 'rare',     points: 40, check: g => g.battle.totalKills >= 100 },
  { id: 'combat_4', name: '竜殺し',         desc: 'ドラゴンを倒す',       icon: '🐉', rarity: 'epic',     points: 80, check: g => g.battle.dragonKills >= 1,  title: '竜殺し' },
  { id: 'combat_5', name: 'ボス討伐者',     desc: 'ボスを5体倒す',        icon: '👑', rarity: 'rare',     points: 50, check: g => g.battle.bossKills >= 5 },
  { id: 'combat_6', name: '魔王討伐',       desc: '魔王を倒す',           icon: '👿', rarity: 'legend',   points: 100,check: g => (g.battle.killsByEnemy?.demon_lord||0)>=1, title: '魔王討伐者' },
];
Object.freeze(COMBAT_ACHIEVEMENTS);
