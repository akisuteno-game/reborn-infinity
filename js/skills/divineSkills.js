/* ============================================
   Reborn Infinity - js/skills/divineSkills.js
   神格系スキルデータ（転生後解放）
   ============================================ */

const DIVINE_SKILLS = [
  {
    id: 'divine_protection',
    name: '神の加護',
    category: 'divine',
    icon: '😇',
    desc: '神の力でHP・寿命・名声が上がる。',
    xpBase: 500,
    effect: { stat: 'hp', perLevel: 30, stat2: 'lifespan', perLevel2: 2 },
    reqFame: 150,
    reqRebirth: 1,
    unlockDesc: '転生1回・名声150',
  },
  {
    id: 'soul_power',
    name: '魂の力',
    category: 'divine',
    icon: '💎',
    desc: '魂の力を解放する。XP倍率が大幅増加。',
    xpBase: 600,
    effect: { stat: 'xp', perLevel: 0.10 },
    reqFame: 200,
    reqRebirth: 1,
    unlockDesc: '転生1回・名声200',
  },
  {
    id: 'divine_wisdom',
    name: '神の叡智',
    category: 'divine',
    icon: '📚',
    desc: 'すべてのスキルXP獲得量が大幅増加。',
    xpBase: 700,
    effect: { stat: 'skillXp', perLevel: 0.10 },
    reqFame: 250,
    reqRebirth: 2,
    reqSkill: { soul_power: 10 },
    unlockDesc: '転生2回・名声250・魂の力Lv10',
  },
  {
    id: 'immortality',
    name: '不死',
    category: 'divine',
    icon: '♾️',
    desc: '死を超越する力。寿命が大幅に延びる。',
    xpBase: 1000,
    effect: { stat: 'lifespan', perLevel: 10 },
    reqFame: 400,
    reqRebirth: 3,
    reqSkill: { divine_protection: 20 },
    unlockDesc: '転生3回・名声400・神の加護Lv20',
  },
  {
    id: 'cosmic_awareness',
    name: '宇宙意識',
    category: 'divine',
    icon: '🌌',
    desc: '宇宙の真理に目覚める。全ての能力が上昇。',
    xpBase: 2000,
    effect: { stat: 'xp', perLevel: 0.15, stat2: 'coin', perLevel2: 0.15 },
    reqFame: 800,
    reqRebirth: 5,
    reqTier: 4,
    reqSkill: { divine_wisdom: 20, immortality: 10 },
    unlockDesc: 'Tier4・転生5回・名声800',
  },
];

Object.freeze(DIVINE_SKILLS);
