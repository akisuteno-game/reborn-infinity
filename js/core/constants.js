/* ============================================
   Reborn Infinity - js/core/constants.js
   ゲーム定数定義
   ============================================ */

const CONSTANTS = {

  // ===== ゲームバージョン =====
  VERSION: '0.1.0',
  SAVE_VERSION: 1,

  // ===== 時間 =====
  TICK_INTERVAL_MS: 100,   // メインループ間隔（ms）
  DAYS_PER_YEAR: 365,
  START_AGE: 14,
  BASE_LIFESPAN: 70,
  MAX_LIFESPAN: 9999,

  // ===== スピード =====
  SPEED_OPTIONS: [1, 2, 5, 10],
  DEFAULT_SPEED: 1,

  // ===== XP =====
  XP_PER_TICK_JOB:   2.0,
  XP_PER_TICK_SKILL: 1.5,
  XP_BASE_MULTIPLIER: 1.0,

  // ===== Tier =====
  TIER_COUNT: 16,     // Tier0〜Tier15
  MAX_TIER: 15,

  // ===== 職業 =====
  JOB_RANK_COUNT: 8,
  JOB_MAX_LEVEL: 100,
  JOB_RANKS: [
    'village',      // 村人級
    'apprentice',   // 見習い
    'advanced',     // 上級
    'elite',        // 精鋭
    'hero',         // 英雄
    'divine',       // 神格
    'concept',      // 概念
    'creator',      // 創造主
  ],

  // ===== スキル =====
  SKILL_MAX_LEVEL: 100,
  SKILL_CATEGORIES: [
    'combat',
    'gather',
    'craft',
    'magic',
    'life',
    'divine',
    'concept',
    'special',
  ],

  // ===== レアリティ =====
  RARITY: {
    COMMON:   'common',
    UNCOMMON: 'uncommon',
    RARE:     'rare',
    EPIC:     'epic',
    LEGEND:   'legend',
    MYTH:     'myth',
    DIVINE:   'divine',
  },

  RARITY_WEIGHT: {
    common:   60,
    uncommon: 25,
    rare:     10,
    epic:      4,
    legend:    1,
  },

  RARITY_LABEL: {
    common:   'コモン',
    uncommon: 'アンコモン',
    rare:     'レア',
    epic:     'エピック',
    legend:   'レジェンド',
    myth:     'ミシック',
    divine:   'ディバイン',
  },

  // ===== セーブ =====
  SAVE_KEY: 'reborn_infinity_save',
  AUTOSAVE_INTERVAL_MS: 30000,  // 30秒

  // ===== UI =====
  LOG_MAX_ENTRIES: 50,
  TOAST_DURATION_MS: 3000,
  NOTIFICATION_MAX: 5,

  // ===== 転生（Tier1） =====
  SOUL_TREE_CATEGORIES: [
    'xp',        // 経験値の魂
    'coin',      // コインの魂
    'lifespan',  // 寿命の魂
    'skill',     // スキルの魂
    'explore',   // 探索の魂
    'craft',     // クラフトの魂
    'auto',      // 自動化の魂
  ],
  SOUL_TREE_MAX_LEVEL: 100,
  SOUL_TREE_TOTAL_LEVELS: 700,

  // ===== 戦闘 =====
  BATTLE_BASE_ATK: 5,
  BATTLE_BASE_DEF: 2,
  BATTLE_BASE_HP:  100,
  BATTLE_BASE_MP:  10,
  CRIT_RATE_BASE:  0.05,
  CRIT_MULT_BASE:  1.5,

  // ===== 探索 =====
  EXPLORE_BASE_TICKS: 50,
  EXPLORE_MAX_ACTIVE: 1,

  // ===== インベントリ =====
  INVENTORY_MAX_SLOTS: 200,
  EQUIPMENT_SLOTS: ['weapon', 'armor', 'accessory1', 'accessory2', 'relic'],

  // ===== ペット =====
  PET_MAX_ACTIVE: 3,
  PET_MAX_LEVEL: 100,

  // ===== ギルド =====
  GUILD_MAX_LEVEL: 50,
  GUILD_MAX_MEMBERS: 30,

  // ===== 実績 =====
  ACHIEVEMENT_TOTAL: 803,

  // ===== オフライン進行 =====
  OFFLINE_MAX_HOURS: 24,
  OFFLINE_EFFICIENCY: 0.5,

  // ===== 数値表示 =====
  NUMBER_SUFFIXES: [
    '',    // 1
    'K',   // 1,000
    'M',   // 1,000,000
    'B',   // 1,000,000,000
    'T',   // 1e12
    'Qa',  // 1e15
    'Qi',  // 1e18
    'Sx',  // 1e21
    'Sp',  // 1e24
    'Oc',  // 1e27
    'No',  // 1e30
    'Dc',  // 1e33
    '∞',
  ],

};

// 読み取り専用に凍結
Object.freeze(CONSTANTS);
Object.freeze(CONSTANTS.RARITY);
Object.freeze(CONSTANTS.RARITY_LABEL);
Object.freeze(CONSTANTS.RARITY_WEIGHT);
Object.freeze(CONSTANTS.SPEED_OPTIONS);
Object.freeze(CONSTANTS.JOB_RANKS);
Object.freeze(CONSTANTS.SKILL_CATEGORIES);
Object.freeze(CONSTANTS.SOUL_TREE_CATEGORIES);
Object.freeze(CONSTANTS.EQUIPMENT_SLOTS);
Object.freeze(CONSTANTS.NUMBER_SUFFIXES);
