/* ============================================
   Reborn Infinity - js/player/age.js
   年齢・日付管理
   ============================================ */

const Age = {

  // ===== 現在の年齢 =====
  get()       { return G.time.age; },
  getDay()    { return G.time.day; },

  // ===== 年齢テキスト =====
  getText()   { return NumberUtil.age(G.time.age, G.time.day); },

  // ===== 年齢バーパーセント =====
  getPct()    { return TimeSystem.getAgePct(G); },

  // ===== 残り寿命 =====
  getRemaining()     { return TimeSystem.getRemainingDays(G); },
  getRemainingYears() {
    return Math.max(0, G.time.lifespan - G.time.age);
  },

  // ===== 寿命が近いか =====
  isNearEnd(threshold = 0.85) {
    return this.getPct() >= threshold * 100;
  },

  // ===== 死亡判定 =====
  isDead() { return G.time.isDead; },

};
