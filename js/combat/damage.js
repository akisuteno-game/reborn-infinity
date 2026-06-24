/* js/combat/damage.js - ダメージ計算 */
const Damage = {
  calc(atk, def, variance = 0.1) { return Math.max(1, Math.floor((atk - def) * RNG.vary(1, variance))); },
  calcMagic(power, mdef, variance = 0.1) { return Math.max(1, Math.floor(power * RNG.vary(1, variance))); },
  calcTrue(amount) { return Math.max(1, Math.floor(amount)); },
};
