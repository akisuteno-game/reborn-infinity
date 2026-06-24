/* js/combat/autoBattle.js - オート戦闘 */
const AutoBattle = {
  tick(G) {
    if (!Config.get('autoBattle')) return;
    if (!G.battle.inBattle || !G.battle.enemy) return;
    CombatManager.attack();
  },
};
