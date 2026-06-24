/* ============================================
   Reborn Infinity - js/player/stats.js
   プレイヤーステータス計算
   ============================================ */

const Stats = {

  // ===== ATK（攻撃力）=====
  getAtk() {
    let base = CONSTANTS.BATTLE_BASE_ATK;
    // 職業ボーナス
    base += JobManager.getAtkBonus();
    // スキルボーナス
    base += SkillManager.getStatBonus('atk');
    // 装備ボーナス
    base += this._getEquipBonus('atk');
    // ペットボーナス
    base += PetManager.getStatBonus('atk');
    return Math.floor(base);
  },

  // ===== DEF（防御力）=====
  getDef() {
    let base = CONSTANTS.BATTLE_BASE_DEF;
    base += JobManager.getDefBonus();
    base += SkillManager.getStatBonus('def');
    base += this._getEquipBonus('def');
    base += PetManager.getStatBonus('def');
    return Math.floor(base);
  },

  // ===== MaxHP =====
  getMaxHp() {
    let base = CONSTANTS.BATTLE_BASE_HP;
    base += SkillManager.getStatBonus('hp');
    base += this._getEquipBonus('hp');
    base += PetManager.getStatBonus('hp');
    // 転生ボーナス
    base *= G.rebirth.bonusXp || 1;
    return Math.floor(base);
  },

  // ===== MaxMP =====
  getMaxMp() {
    let base = CONSTANTS.BATTLE_BASE_MP;
    base += SkillManager.getStatBonus('mp');
    base += this._getEquipBonus('mp');
    // 魔法職業ボーナス
    const job = G.jobs.current;
    if (job === 'mage' || job === 'archmage') base += 15;
    return Math.floor(base);
  },

  // ===== クリティカル率 =====
  getCritRate() {
    let base = CONSTANTS.CRIT_RATE_BASE;
    base += SkillManager.getStatBonus('critRate');
    base += this._getEquipBonus('critRate');
    return MathUtil.clamp(base, 0, 0.75); // 最大75%
  },

  // ===== クリティカル倍率 =====
  getCritMult() {
    let base = CONSTANTS.CRIT_MULT_BASE;
    base += SkillManager.getStatBonus('critMult');
    base += this._getEquipBonus('critMult');
    return base;
  },

  // ===== XP倍率 =====
  getXpMult() {
    let mult = G.rebirth.bonusXp || 1.0;
    mult *= SkillManager.getXpMult();
    mult *= this._getEquipMult('xp');
    mult *= SoulTree.getBonus('xp');
    return mult;
  },

  // ===== コイン倍率 =====
  getCoinMult() {
    let mult = G.rebirth.bonusCoin || 1.0;
    mult *= SkillManager.getCoinMult();
    mult *= this._getEquipMult('coin');
    mult *= SoulTree.getBonus('coin');
    return mult;
  },

  // ===== 名声倍率 =====
  getFameMult() {
    let mult = 1.0;
    mult *= SkillManager.getFameMult();
    return mult;
  },

  // ===== 素材倍率 =====
  getMatMult() {
    let mult = 1.0;
    mult *= SkillManager.getMatMult();
    mult *= SoulTree.getBonus('explore');
    return mult;
  },

  // ===== 寿命ボーナス =====
  getLifespanBonus() {
    let bonus = 0;
    bonus += SkillManager.getStatBonus('lifespan');
    bonus += this._getEquipBonus('lifespan');
    bonus += SoulTree.getBonus('lifespan');
    return bonus;
  },

  // ===== ステータスを G に反映 =====
  update() {
    const maxHp = this.getMaxHp();
    const maxMp = this.getMaxMp();
    // maxが下がった場合はクランプ
    if (G.battle.maxHp !== maxHp) {
      G.battle.maxHp = maxHp;
      G.battle.hp = Math.min(G.battle.hp, maxHp);
    }
    if (G.battle.maxMp !== maxMp) {
      G.battle.maxMp = maxMp;
      G.battle.mp = Math.min(G.battle.mp, maxMp);
    }
    G.battle.atk      = this.getAtk();
    G.battle.def      = this.getDef();
    G.battle.critRate = this.getCritRate();
    G.battle.critMult = this.getCritMult();
    // 寿命更新
    const lifespanBonus = this.getLifespanBonus();
    G.time.lifespan = CONSTANTS.BASE_LIFESPAN + lifespanBonus;
  },

  // ===== 装備ボーナス取得（内部） =====
  _getEquipBonus(stat) {
    // EquipmentManagerが未定義の場合はスキップ
    if (typeof EquipmentManager === 'undefined') return 0;
    return EquipmentManager.getStatBonus(stat);
  },

  _getEquipMult(stat) {
    if (typeof EquipmentManager === 'undefined') return 1;
    return EquipmentManager.getStatMult(stat);
  },

};
