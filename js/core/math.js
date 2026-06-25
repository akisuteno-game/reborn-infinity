/* ============================================
   Reborn Infinity - js/core/math.js
   数学ユーティリティ
   ============================================ */

const MathUtil = {

  // ===== 基本 =====
  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  },

  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  pct(val, max) {
    if (max <= 0) return 0;
    return this.clamp(val / max * 100, 0, 100);
  },

  round(val, decimals = 0) {
    const factor = Math.pow(10, decimals);
    return Math.round(val * factor) / factor;
  },

  floor(val) {
    return Math.floor(val);
  },

  ceil(val) {
    return Math.ceil(val);
  },

  // ===== XP計算 =====
  // 基本XP必要量（レベルが上がるほど多く必要）
  xpRequired(baseXp, level, scaleFactor = 1.15) {
    return Math.floor(baseXp * Math.pow(scaleFactor, level - 1));
  },

  // 職業XP必要量
  jobXpRequired(baseXp, level) {
    return Math.floor(baseXp * level);
  },

  // スキルXP必要量
  skillXpRequired(baseXp, level) {
    return Math.floor(baseXp * level * 1.1);
  },

  // ===== ボーナス計算 =====
  // 乗算ボーナスを合成（例：1.2 × 1.3 = 1.56）
  multiplyBonuses(...multipliers) {
    return multipliers.reduce((acc, m) => acc * m, 1);
  },

  // 加算ボーナスを合計してから乗算（例：(1 + 0.2 + 0.3) = 1.5）
  additiveBonuses(base, ...additives) {
    const total = additives.reduce((acc, a) => acc + a, 0);
    return base * (1 + total);
  },

  // パーセンテージボーナスを乗数に変換
  pctToMult(pct) {
    return 1 + pct / 100;
  },

  // ===== スケーリング =====
  // 線形スケール
  linearScale(level, baseValue, perLevel) {
    return baseValue + perLevel * (level - 1);
  },

  // 指数スケール
  expScale(level, baseValue, factor) {
    return baseValue * Math.pow(factor, level - 1);
  },

  // ログスケール（序盤は伸びる、終盤は緩やか）
  logScale(level, baseValue, strength = 10) {
    return baseValue * (1 + Math.log(level) * strength / 100);
  },

  // ===== 確率 =====
  // 確率チェック（0〜1）
  chance(probability) {
    return Math.random() < probability;
  },

  // 確率チェック（0〜100%）
  chancePct(pct) {
    return Math.random() * 100 < pct;
  },

  // ===== 時間換算 =====
  daysToYears(days) {
    return Math.floor(days / CONSTANTS.DAYS_PER_YEAR);
  },

  yearsToDays(years) {
    return years * CONSTANTS.DAYS_PER_YEAR;
  },

  // ===== ダメージ計算 =====
  calcDamage(atk, def, variance = 0.1) {
    const base = Math.max(1, atk - def);
    const v = 1 + (Math.random() * 2 - 1) * variance;
    return Math.max(1, Math.floor(base * v));
  },

  calcCritDamage(damage, critMult = CONSTANTS.CRIT_MULT_BASE) {
    return Math.floor(damage * critMult);
  },

  isCrit(critRate = CONSTANTS.CRIT_RATE_BASE) {
    return this.chance(critRate);
  },

  // ===== 魂の欠片計算（転生時） =====
  calcSoulFragments(G) {
    let fragments = 0;
    // 総レベルの合計
    for (const id in G.jobs.levels) {
      fragments += G.jobs.levels[id];
    }
    // 年齢ボーナス
    fragments += G.time.age * 0.5;
    // コインボーナス
    fragments += Math.log10(Math.max(1, G.resources.coins)) * 10;
    // 実績ボーナス
    fragments += G.achievements.unlocked.length * 5;
    // ボス討伐ボーナス
    fragments += G.battle.totalKills * 2;
    return Math.floor(fragments);
  },

  // ===== 転生ボーナス =====
  calcRebirthBonus(rebirthCount) {
    // 転生回数に応じてXP倍率上昇
    if (rebirthCount <= 0) return 1.0;
    return parseFloat((1 + rebirthCount * 0.1).toFixed(2));
  },

  // ===== オフライン進行 =====
  calcOfflineTicks(elapsedMs, speed = 1) {
    const maxMs = CONSTANTS.OFFLINE_MAX_HOURS * 3600 * 1000;
    const clampedMs = Math.min(elapsedMs, maxMs);
    const ticks = Math.floor(clampedMs / CONSTANTS.TICK_INTERVAL_MS);
    return Math.floor(ticks * CONSTANTS.OFFLINE_EFFICIENCY);
  },

};

Object.freeze(MathUtil);
