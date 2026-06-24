/* js/combat/statusEffects.js - 状態異常 */
const StatusEffects = {
  _effects: {},
  apply(target, effect, duration) { this._effects[target] = { effect, duration, tick: 0 }; },
  tick()  { for (const t in this._effects) { this._effects[t].tick++; if (this._effects[t].tick >= this._effects[t].duration) delete this._effects[t]; } },
  has(target, effect) { return this._effects[target]?.effect === effect; },
  clear() { this._effects = {}; },
};
