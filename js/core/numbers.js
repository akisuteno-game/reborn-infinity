/* ============================================
   Reborn Infinity - js/core/numbers.js
   数値フォーマット・表示ユーティリティ
   ============================================ */

const NumberUtil = {

  // ===== 短縮表示（1.23M など） =====
  format(val) {
    if (!isFinite(val) || isNaN(val)) return '0';
    if (val < 0) return '-' + this.format(-val);

    const suffixes = CONSTANTS.NUMBER_SUFFIXES;
    if (val < 1000) return Math.floor(val).toString();

    let tier = Math.floor(Math.log10(val) / 3);
    tier = Math.min(tier, suffixes.length - 1);

    const scaled = val / Math.pow(1000, tier);
    const formatted = scaled >= 100
      ? Math.floor(scaled).toString()
      : scaled >= 10
        ? scaled.toFixed(1)
        : scaled.toFixed(2);

    return formatted + suffixes[tier];
  },

  // ===== コンマ区切り（1,234,567） =====
  comma(val) {
    if (!isFinite(val) || isNaN(val)) return '0';
    return Math.floor(val).toLocaleString('ja-JP');
  },

  // ===== パーセント表示 =====
  pct(val, decimals = 1) {
    if (!isFinite(val) || isNaN(val)) return '0%';
    return val.toFixed(decimals) + '%';
  },

  // ===== 倍率表示（x1.50 など） =====
  mult(val, decimals = 2) {
    if (!isFinite(val) || isNaN(val)) return 'x1.00';
    return 'x' + val.toFixed(decimals);
  },

  // ===== XP表示（1,234 / 5,678） =====
  xp(current, max) {
    return this.format(current) + ' / ' + this.format(max);
  },

  // ===== 年齢表示 =====
  age(age, day) {
    return age + '歳 ' + day + '日';
  },

  // ===== 寿命バーパーセント =====
  lifePct(age, lifespan) {
    return MathUtil.pct((age - CONSTANTS.START_AGE) * CONSTANTS.DAYS_PER_YEAR, lifespan * CONSTANTS.DAYS_PER_YEAR);
  },

  // ===== 時間表示（秒→分:秒） =====
  time(seconds) {
    if (seconds < 60) return Math.floor(seconds) + '秒';
    if (seconds < 3600) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return m + '分' + (s > 0 ? s + '秒' : '');
    }
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h + '時間' + (m > 0 ? m + '分' : '');
  },

  // ===== ティック→時間 =====
  ticksToTime(ticks) {
    const seconds = ticks * CONSTANTS.TICK_INTERVAL_MS / 1000;
    return this.time(seconds);
  },

  // ===== 符号付き表示（+123 / -456） =====
  signed(val, format = 'short') {
    const abs = Math.abs(val);
    const str = format === 'comma' ? this.comma(abs) : this.format(abs);
    return (val >= 0 ? '+' : '-') + str;
  },

  // ===== ランクロマン数字 =====
  romanRank(rank) {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    return romans[rank] || rank.toString();
  },

  // ===== ガウス記法（非常に大きな数） =====
  scientific(val) {
    if (val < 1e6) return this.format(val);
    const exp = Math.floor(Math.log10(val));
    const base = (val / Math.pow(10, exp)).toFixed(2);
    return base + 'e' + exp;
  },

  // ===== 変動率表示 =====
  delta(val) {
    if (val === 0) return '±0';
    return this.signed(val);
  },

};

Object.freeze(NumberUtil);
