/* ============================================
   Reborn Infinity - js/core/rng.js
   乱数生成ユーティリティ
   ============================================ */

const RNG = {

  // ===== 基本乱数 =====
  // 0以上1未満の乱数
  random() {
    return Math.random();
  },

  // min以上max未満の浮動小数点乱数
  float(min, max) {
    return min + Math.random() * (max - min);
  },

  // min以上max以下の整数乱数
  int(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  },

  // ===== 確率 =====
  // prob（0〜1）の確率でtrueを返す
  chance(prob) {
    return Math.random() < prob;
  },

  // pct（0〜100）の確率でtrueを返す
  chancePct(pct) {
    return Math.random() * 100 < pct;
  },

  // ===== 配列 =====
  // 配列からランダムに1つ選ぶ
  pick(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // 配列からランダムにn個選ぶ（重複なし）
  pickN(arr, n) {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, shuffled.length));
  },

  // 配列をシャッフル（破壊的）
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // 配列をシャッフル（非破壊的）
  shuffled(arr) {
    return this.shuffle([...arr]);
  },

  // ===== 重み付き抽選 =====
  // weights: { key: weight } の形式
  weighted(weights) {
    const keys = Object.keys(weights);
    const total = keys.reduce((sum, k) => sum + weights[k], 0);
    let rand = Math.random() * total;
    for (const key of keys) {
      rand -= weights[key];
      if (rand <= 0) return key;
    }
    return keys[keys.length - 1];
  },

  // ===== レアリティ抽選 =====
  rarity(bonusLuck = 0) {
    const weights = { ...CONSTANTS.RARITY_WEIGHT };
    // 幸運ボーナスがあると高レアリティが出やすい
    if (bonusLuck > 0) {
      weights.rare   *= 1 + bonusLuck * 0.1;
      weights.epic   *= 1 + bonusLuck * 0.2;
      weights.legend *= 1 + bonusLuck * 0.5;
      weights.common *= Math.max(0.1, 1 - bonusLuck * 0.05);
    }
    return this.weighted(weights);
  },

  // ===== 変動付き数値 =====
  // 基準値にvariance（0〜1）の変動を加える
  vary(base, variance = 0.1) {
    const factor = 1 + (Math.random() * 2 - 1) * variance;
    return base * factor;
  },

  // 整数変動
  varyInt(base, variance = 0.1) {
    return Math.max(1, Math.floor(this.vary(base, variance)));
  },

  // ===== ガウス分布（近似） =====
  gaussian(mean = 0, std = 1) {
    // Box-Muller変換
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z * std;
  },

};

Object.freeze(RNG);
