/* js/prestige/rebirth/rebirthAutomation.js */
const RebirthAutomation = {
  check(G) {
    if (!G.automation.rebirth) return;
    if (!G.time.isDead) return;
    RebirthSystem.doRebirth();
  },
};
