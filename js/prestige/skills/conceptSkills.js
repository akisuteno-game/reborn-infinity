/* ============================================
   Reborn Infinity - js/skills/conceptSkills.js
   概念系スキルデータ（Tier13以降）
   ============================================ */

const CONCEPT_SKILLS = [
  {
    id: 'time_mastery',
    name: '時間支配',
    category: 'concept',
    icon: '⏳',
    desc: '時間を操る力。XP・探索速度が飛躍的に上昇。',
    xpBase: 10000,
    effect: { stat: 'xp', perLevel: 0.30, stat2: 'explore', perLevel2: 0.20 },
    reqFame: 5000,
    reqTier: 11,
    unlockDesc: 'Tier11到達・名声5000',
  },
  {
    id: 'life_concept',
    name: '生命概念',
    category: 'concept',
    icon: '🌱',
    desc: '生命そのものを概念として支配する。HPと寿命が極限まで上昇。',
    xpBase: 20000,
    effect: { stat: 'hp', perLevel: 500, stat2: 'lifespan', perLevel2: 50 },
    reqFame: 10000,
    reqTier: 13,
    unlockDesc: 'Tier13到達・名声10000',
  },
  {
    id: 'wealth_concept',
    name: '富の概念',
    category: 'concept',
    icon: '💰',
    desc: '富と繁栄を概念として支配する。コイン獲得が無限に近い。',
    xpBase: 20000,
    effect: { stat: 'coin', perLevel: 0.50 },
    reqFame: 10000,
    reqTier: 13,
    unlockDesc: 'Tier13到達・名声10000',
  },
  {
    id: 'void_concept',
    name: '虚無概念',
    category: 'concept',
    icon: '🕳️',
    desc: '虚無を概念として支配する。全能力が極限まで上昇。',
    xpBase: 50000,
    effect: { stat: 'xp', perLevel: 1.0, stat2: 'coin', perLevel2: 1.0 },
    reqFame: 50000,
    reqTier: 14,
    reqSkill: { time_mastery: 20, life_concept: 20 },
    unlockDesc: 'Tier14到達・名声50000',
  },
];

Object.freeze(CONCEPT_SKILLS);
