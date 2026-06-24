/* ============================================
   Reborn Infinity - js/core/state.js
   ゲーム状態（G）の定義・初期化・リセット
   ============================================ */

// ゲームのグローバル状態オブジェクト
let G = {};

const State = {

  // ===== 初期状態を生成 =====
  createInitial() {
    return {

      // ===== メタ =====
      meta: {
        version:      CONSTANTS.VERSION,
        saveVersion:  CONSTANTS.SAVE_VERSION,
        playTime:     0,        // 総プレイ時間（ティック）
        lastSaved:    null,
        createdAt:    Date.now(),
      },

      // ===== 現在のTier =====
      tier: 0,

      // ===== 時間・年齢 =====
      time: {
        day:       0,
        age:       CONSTANTS.START_AGE,
        lifespan:  CONSTANTS.BASE_LIFESPAN,
        isDead:    false,
        totalDays: 0,
        totalTicks: 0,
      },

      // ===== プレイヤーステータス =====
      player: {
        name:  '名もなき者',
        title: '',      // 現在の称号
      },

      // ===== 通貨・リソース =====
      resources: {
        // Tier0
        coins:   0,
        fame:    0,
        materials: 0,
        totalCoinsEarned: 0,

        // Tier1（転生）
        soulFragments: 0,
        soulPoints:    0,

        // Tier2（覚醒）
        awakeningCrystals: 0,
        constellationPoints: 0,

        // Tier3（超越）
        transcendenceEssence: 0,

        // Tier4（神格化）
        divinePower: 0,
        faithPoints: 0,

        // Tier5（宇宙創造）
        creationPower: 0,
        universePoints: 0,

        // Tier6〜15は順次追加
        multiverseParticles: 0,
        dimensionEnergy:     0,
        infinityPoints:      0,
        eternityParticles:   0,
        realityCrystals:     0,
        timelineEnergy:      0,
        causalityPoints:     0,
        conceptEssence:      0,
        voidEnergy:          0,
        creatorPower:        0,
      },

      // ===== 職業 =====
      jobs: {
        current:  'villager',     // 現在の職業ID
        levels:   {},             // { jobId: level }
        xp:       {},             // { jobId: xp }
        unlocked: ['villager'],   // 解放済み職業ID
        changed:  0,              // 職業変更回数
      },

      // ===== スキル =====
      skills: {
        current:  'strength',     // 現在訓練中のスキルID
        levels:   {},             // { skillId: level }
        xp:       {},             // { skillId: xp }
        unlocked: ['strength'],   // 解放済みスキルID
      },

      // ===== 戦闘 =====
      battle: {
        hp:       CONSTANTS.BATTLE_BASE_HP,
        maxHp:    CONSTANTS.BATTLE_BASE_HP,
        mp:       CONSTANTS.BATTLE_BASE_MP,
        maxMp:    CONSTANTS.BATTLE_BASE_MP,
        atk:      CONSTANTS.BATTLE_BASE_ATK,
        def:      CONSTANTS.BATTLE_BASE_DEF,
        critRate: CONSTANTS.CRIT_RATE_BASE,
        critMult: CONSTANTS.CRIT_MULT_BASE,

        // 現在の戦闘
        enemy:        null,       // 現在の敵ID
        enemyHp:      0,
        enemyMaxHp:   0,
        inBattle:     false,
        battleLog:    [],

        // 統計
        totalKills:   0,
        bossKills:    0,
        dragonKills:  0,
        demonKills:   0,
        killsByEnemy: {},         // { enemyId: count }
      },

      // ===== 探索 =====
      explore: {
        current:   null,          // 現在探索中のエリアID
        progress:  0,             // 探索進捗（ティック）
        unlocked:  ['village_outskirts'],
        visited:   [],            // 訪問済みエリアID
        totalExplored: 0,
      },

      // ===== クラフト =====
      craft: {
        totalCrafted: 0,
        craftLog:     [],
      },

      // ===== インベントリ =====
      inventory: {
        items:    {},             // { itemId: count }
        maxSlots: CONSTANTS.INVENTORY_MAX_SLOTS,
      },

      // ===== 装備 =====
      equipment: {
        weapon:      null,
        armor:       null,
        accessory1:  null,
        accessory2:  null,
        relic:       null,
        owned:       [],          // 所持している装備ID[]
      },

      // ===== ペット =====
      pets: {
        active:   [],             // アクティブペットID[]（最大3）
        owned:    [],             // 所持ペットID[]
        levels:   {},             // { petId: level }
        xp:       {},             // { petId: xp }
      },

      // ===== クエスト =====
      quests: {
        active:    [],
        completed: [],
        failed:    [],
        progress:  {},            // { questId: { ... } }
      },

      // ===== ギルド =====
      guilds: {
        current:  null,
        rank:     0,
        research: {},
        bonuses:  {},
      },

      // ===== 実績 =====
      achievements: {
        unlocked:   [],
        progress:   {},           // { achId: currentVal }
        totalPoints: 0,
      },

      // ===== 称号 =====
      titles: {
        unlocked:  [],
        equipped:  '',
      },

      // ===== 図鑑 =====
      collection: {
        jobs:     [],
        skills:   [],
        enemies:  [],
        items:    [],
        regions:  [],
        titles:   [],
        events:   [],
      },

      // ===== 転生システム（Tier1） =====
      rebirth: {
        count:       0,
        soulTree:    {},          // { nodeId: level }
        bonusXp:     1.0,
        bonusCoin:   1.0,
        challenges:  [],
      },

      // ===== 覚醒システム（Tier2） =====
      awakening: {
        constellations: {},       // { constellationId: level }
        unlocked:       [],
      },

      // ===== 超越システム（Tier3） =====
      transcendence: {
        runes:    {},
        unlocked: [],
      },

      // ===== 神格化（Tier4） =====
      divinity: {
        godClass:  null,
        level:     0,
        skills:    {},
        faithers:  0,
      },

      // ===== Tier5〜15はシンプルに初期化 =====
      universe:    { created: 0, laws: {} },
      multiverse:  { worlds: [] },
      dimensions:  { explored: [] },
      infinity:    { upgrades: {} },
      eternity:    { research: {} },
      reality:     { rules: {} },
      timeline:    { edits: [] },
      causality:   { rewrites: [] },
      concept:     { concepts: {} },
      void_:       { coreLevel: 0 },
      creator:     { worlds: [] },

      // ===== オートメーション =====
      automation: {
        explore:      false,
        craft:        false,
        equip:        false,
        job:          false,
        rebirth:      false,
        awakening:    false,
        transcendence: false,
        divinity:     false,
        universe:     false,
        everything:   false,
      },

      // ===== 統計 =====
      stats: {
        totalPlayTicks:    0,
        totalRebirths:     0,
        highestTier:       0,
        totalAchievements: 0,
      },

    };
  },

  // ===== 初期化 =====
  init() {
    G = this.createInitial();
    this._initJobData();
    this._initSkillData();
  },

  // ===== 職業データ初期化 =====
  _initJobData() {
    if (typeof JOB_DATA === 'undefined') return;
    JOB_DATA.forEach(job => {
      if (!G.jobs.levels[job.id]) G.jobs.levels[job.id] = 1;
      if (!G.jobs.xp[job.id])    G.jobs.xp[job.id]    = 0;
    });
  },

  // ===== スキルデータ初期化 =====
  _initSkillData() {
    if (typeof SKILL_DATA === 'undefined') return;
    SKILL_DATA.forEach(skill => {
      if (!G.skills.levels[skill.id]) G.skills.levels[skill.id] = 1;
      if (!G.skills.xp[skill.id])    G.skills.xp[skill.id]    = 0;
    });
  },

  // ===== 状態を外部データでマージ（ロード時） =====
  merge(savedData) {
    G = this._deepMerge(this.createInitial(), savedData);
  },

  // ===== ディープマージ =====
  _deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this._deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  },

  // ===== リセット =====
  reset() {
    G = this.createInitial();
    this._initJobData();
    this._initSkillData();
  },

};
