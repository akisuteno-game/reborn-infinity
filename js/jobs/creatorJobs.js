/* ============================================
   Reborn Infinity - js/jobs/creatorJobs.js
   創造主級職業データ（Rank7）Tier15解放
   ============================================ */

const CREATOR_JOBS = [
  {
    id: 'god',
    name: '神',
    rank: 7,
    category: 'special',
    icon: '🌟',
    desc: '全ての上位に立つ神。あらゆる能力が無限大に近い。',
    income: 99999,
    xpBase: 9999999,
    reqFame: 999999,
    reqTier: 15,
    reqLevel: { void_walker: 50 },
    bonuses: { coin: 10.0, xp: 10.0, mat: 10.0, fame: 10.0, hp: 99999, lifespan: 999 },
    unlockDesc: 'Tier15到達・全職業マスター',
  },
  {
    id: 'creator',
    name: '創造主',
    rank: 7,
    category: 'special',
    icon: '✨',
    desc: '全てを創造した存在。ゲームの最終到達点。',
    income: 999999,
    xpBase: 99999999,
    reqFame: 9999999,
    reqTier: 15,
    reqLevel: { god: 100 },
    bonuses: { coin: 100.0, xp: 100.0, mat: 100.0, fame: 100.0 },
    unlockDesc: '創造主Tier15・神Lv100達成',
  },
];

Object.freeze(CREATOR_JOBS);
