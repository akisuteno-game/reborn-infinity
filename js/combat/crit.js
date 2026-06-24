/* js/combat/crit.js - クリティカル処理 */
const Crit = {
  check()            { return RNG.chance(Stats.getCritRate()); },
  apply(dmg)         { return Math.floor(dmg * Stats.getCritMult()); },
  checkAndApply(dmg) { const isCrit = this.check(); return { dmg: isCrit ? this.apply(dmg) : dmg, isCrit }; },
};
