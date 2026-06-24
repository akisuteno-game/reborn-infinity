/* js/prestige/rebirth/rebirth.js */
const RebirthSystem = {
  canRebirth() { return G.time.isDead; },
  doRebirth() {
    if (!this.canRebirth()) return false;
    const frags = SoulFragments.calc(G);
    SoulFragments.convert(frags);
    const bonus = MathUtil.calcRebirthBonus(G.rebirth.count + 1);
    G.rebirth.bonusXp = bonus;
    G.rebirth.bonusCoin = 1 + (G.rebirth.count * 0.05);
    G.rebirth.count++;
    G.time.day = 0; G.time.age = CONSTANTS.START_AGE; G.time.isDead = false;
    G.resources.coins = 0; G.resources.fame = 0; G.resources.materials = 0;
    G.time.lifespan = CONSTANTS.BASE_LIFESPAN + SoulTree.getBonus('lifespan');
    G.battle.hp = Stats.getMaxHp(); G.battle.mp = Stats.getMaxMp();
    JobManager.resetOnRebirth();
    SkillManager.resetOnRebirth();
    G.explore.current = null; G.explore.progress = 0;
    G.battle.inBattle = false; G.battle.enemy = null;
    Stats.update();
    const badge = document.getElementById('rebirth-badge');
    if (badge) badge.classList.add('hidden');
    EventBus.emit(GAME_EVENTS.REBIRTH, { count: G.rebirth.count, bonus });
    return true;
  },
  getPreview() {
    return {
      fragments:   SoulFragments.calc(G),
      nextBonus:   MathUtil.calcRebirthBonus(G.rebirth.count + 1),
      count:       G.rebirth.count,
      soulPoints:  Math.floor(SoulFragments.calc(G) * (1 + G.rebirth.count * 0.2)),
    };
  },
};
