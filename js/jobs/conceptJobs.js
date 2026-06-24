/* ============================================
   Reborn Infinity - js/jobs/conceptJobs.js
   概念級職業データ（Rank6）Tier13以降解放
   ============================================ */

const CONCEPT_JOBS = [
  {
    id: 'time_god',
    name: '時の神',
    rank: 6,
    category: 'special',
    icon: '⏳',
    desc: '時間そのものを支配する存在。全ての時間関連能力が無限に近い。',
    income: 5000,
    xpBase: 100000,
    reqFame: 10000,
    reqTier: 11,
    reqLevel: { deity: 50 },
    bonuses: { xp: 2.0, lifespan: 100, explore: 1.0 },
    unlockDesc: 'Tier11到達・名声10000・神格者Lv50',
  },
  {
    id: 'concept_master',
    name: '概念の支配者',
    rank: 6,
    category: 'special',
    icon: '🔯',
    desc: '8つの概念全てを操る究極の存在。',
    income: 8000,
    xpBase: 150000,
    reqFame: 20000,
    reqTier: 13,
    reqLevel: { time_god: 30 },
    bonuses: { coin: 2.0, xp: 2.0, mat: 2.0, fame: 2.0 },
    unlockDesc: 'Tier13到達・名声20000・時の神Lv30',
  },
  {
    id: 'void_walker',
    name: '虚無の歩者',
    rank: 6,
    category: 'special',
    icon: '🕳️',
    desc: '虚無を渡り歩く者。存在と非存在の境界に立つ。',
    income: 10000,
    xpBase: 200000,
    reqFame: 30000,
    reqTier: 14,
    reqLevel: { concept_master: 20 },
    bonuses: { xp: 3.0, coin: 3.0, mat: 3.0, hp: 2000 },
    unlockDesc: 'Tier14到達・名声30000・概念の支配者Lv20',
  },
];

Object.freeze(CONCEPT_JOBS);
