/* ============================================
   Reborn Infinity - js/player/currencies.js
   通貨・リソース一覧定義
   ============================================ */

const CURRENCY_DATA = [
  // Tier0
  { id: 'coins',      name: 'コイン',       icon: '💰', tier: 0, color: 'var(--color-coin)' },
  { id: 'fame',       name: '名声',         icon: '⭐', tier: 0, color: 'var(--color-fame)' },
  { id: 'materials',  name: '素材',         icon: '🪨', tier: 0, color: 'var(--color-mat)'  },

  // Tier1
  { id: 'soulFragments',  name: '魂の欠片',   icon: '💎', tier: 1, color: 'var(--color-soul)' },
  { id: 'soulPoints',     name: '魂ポイント', icon: '✨', tier: 1, color: 'var(--color-soul)' },

  // Tier2
  { id: 'awakeningCrystals',   name: '覚醒結晶',   icon: '🔮', tier: 2, color: 'var(--accent-tier2)' },
  { id: 'constellationPoints', name: '星座ポイント',icon: '⭐', tier: 2, color: 'var(--accent-tier2)' },

  // Tier3
  { id: 'transcendenceEssence', name: '超越エッセンス', icon: '💧', tier: 3, color: 'var(--accent-tier3)' },

  // Tier4
  { id: 'divinePower', name: '神威',         icon: '👼', tier: 4, color: 'var(--accent-tier4)' },
  { id: 'faithPoints', name: '信仰ポイント', icon: '🙏', tier: 4, color: 'var(--accent-tier4)' },

  // Tier5
  { id: 'creationPower',  name: '創世力',       icon: '🌌', tier: 5, color: 'var(--accent-tier5)' },
  { id: 'universePoints', name: '宇宙ポイント', icon: '🌠', tier: 5, color: 'var(--accent-tier5)' },

  // Tier6
  { id: 'multiverseParticles', name: '多元粒子', icon: '🔮', tier: 6, color: 'var(--accent-tier6)' },

  // Tier7
  { id: 'dimensionEnergy', name: '次元エネルギー', icon: '🧊', tier: 7, color: 'var(--accent-tier7)' },

  // Tier8
  { id: 'infinityPoints', name: '∞ポイント', icon: '♾️', tier: 8, color: 'var(--accent-tier8)' },

  // Tier9
  { id: 'eternityParticles', name: '永遠粒子', icon: '⏳', tier: 9, color: 'var(--accent-tier9)' },

  // Tier10
  { id: 'realityCrystals', name: '現実結晶', icon: '🔷', tier: 10, color: 'var(--accent-tier10)' },

  // Tier11
  { id: 'timelineEnergy', name: '時空エネルギー', icon: '🌀', tier: 11, color: 'var(--accent-tier11)' },

  // Tier12
  { id: 'causalityPoints', name: '因果粒子', icon: '∞', tier: 12, color: 'var(--accent-tier12)' },

  // Tier13
  { id: 'conceptEssence', name: '概念エッセンス', icon: '🔯', tier: 13, color: 'var(--accent-tier13)' },

  // Tier14
  { id: 'voidEnergy', name: '虚無エネルギー', icon: '🕳️', tier: 14, color: 'var(--accent-tier14)' },

  // Tier15
  { id: 'creatorPower', name: '創造主の力', icon: '🌟', tier: 15, color: 'var(--accent-tier15)' },
];

Object.freeze(CURRENCY_DATA);
