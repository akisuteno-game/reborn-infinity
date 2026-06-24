/* ============================================
   Reborn Infinity - js/player/lifespan.js
   寿命管理
   ============================================ */

const Lifespan = {

  // ===== 現在の寿命 =====
  get()  { return G.time.lifespan; },

  // ===== 寿命を更新（スキル・装備変動時） =====
  update() {
    const bonus = Stats.getLifespanBonus();
    G.time.lifespan = CONSTANTS.BASE_LIFESPAN + bonus;
    G.time.lifespan = Math.min(G.time.lifespan, CONSTANTS.MAX_LIFESPAN);
  },

  // ===== 寿命延長 =====
  extend(years) {
    G.time.lifespan = Math.min(
      G.time.lifespan + years,
      CONSTANTS.MAX_LIFESPAN
    );
  },

  // ===== 基本寿命に対するボーナス年数 =====
  getBonusYears() {
    return G.time.lifespan - CONSTANTS.BASE_LIFESPAN;
  },

  // ===== リセット（転生時） =====
  resetOnRebirth() {
    this.update(); // スキル・装備ボーナスを再計算してリセット
  },

};
