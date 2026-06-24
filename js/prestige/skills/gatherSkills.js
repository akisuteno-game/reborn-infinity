/* ============================================
   Reborn Infinity - js/skills/gatherSkills.js
   採集系スキルデータ
   ============================================ */

const GATHER_SKILLS = [
  {
    id: 'gathering',
    name: '採集',
    category: 'gather',
    icon: '🌿',
    desc: '素材の採集効率が上がる。',
    xpBase: 60,
    effect: { stat: 'mat', perLevel: 0.05 },
    reqFame: 0,
    unlockDesc: '最初から使用可能',
  },
  {
    id: 'mining',
    name: '採掘',
    category: 'gather',
    icon: '⛏️',
    desc: '鉱石の採掘効率が上がる。',
    xpBase: 80,
    effect: { stat: 'mat', perLevel: 0.08 },
    reqFame: 8,
    unlockDesc: '名声8が必要',
  },
  {
    id: 'herbalism',
    name: '薬草学',
    category: 'gather',
    icon: '🌺',
    desc: '薬草の発見率と採集量が上がる。',
    xpBase: 90,
    effect: { stat: 'mat', perLevel: 0.06 },
    reqFame: 10,
    unlockDesc: '名声10が必要',
  },
  {
    id: 'lucky_find',
    name: '幸運な発見',
    category: 'gather',
    icon: '🍀',
    desc: 'レアな素材が見つかる確率が上がる。',
    xpBase: 200,
    effect: { stat: 'luck', perLevel: 0.02 },
    reqFame: 20,
    unlockDesc: '名声20が必要',
  },
  {
    id: 'resource_mastery',
    name: '資源の達人',
    category: 'gather',
    icon: '💎',
    desc: 'すべての素材獲得量が大幅増加。',
    xpBase: 400,
    effect: { stat: 'mat', perLevel: 0.12 },
    reqFame: 50,
    reqSkill: { gathering: 20, mining: 15 },
    unlockDesc: '名声50・採集Lv20・採掘Lv15',
  },
  {
    id: 'nature_affinity',
    name: '自然親和',
    category: 'gather',
    icon: '🌳',
    desc: '自然環境で素材と探索に優れる。',
    xpBase: 300,
    effect: { stat: 'mat', perLevel: 0.08, stat2: 'explore', perLevel2: 0.03 },
    reqFame: 35,
    reqSkill: { herbalism: 15 },
    unlockDesc: '名声35・薬草学Lv15',
  },
];

Object.freeze(GATHER_SKILLS);
