/* js/combat/combatManager.js - 戦闘統括 */
const CombatManager = {
  tick(G) { AutoBattle.tick(G); },
  startBattle(enemyId) {
    const enemy = EnemyManager.getById(enemyId);
    if (!enemy) return false;
    if (enemy.reqFame && G.resources.fame < enemy.reqFame) return false;
    G.battle.enemy     = enemyId;
    G.battle.enemyHp   = enemy.hp;
    G.battle.enemyMaxHp= enemy.hp;
    G.battle.inBattle  = true;
    G.battle.battleLog = [];
    Notification.log(enemy.name + 'が現れた！');
    EventBus.emit(GAME_EVENTS.BATTLE_START, { enemyId });
    return true;
  },
  attack() {
    if (!G.battle.inBattle || !G.battle.enemy) return;
    const enemy   = EnemyManager.getById(G.battle.enemy);
    const baseDmg = Damage.calc(Stats.getAtk(), enemy.def);
    const { dmg, isCrit } = Crit.checkAndApply(baseDmg);
    G.battle.enemyHp -= dmg;
    const logMsg = (isCrit ? '💥会心！' : '') + enemy.name + 'に' + dmg + 'ダメージ！';
    G.battle.battleLog.unshift(logMsg);
    if (G.battle.battleLog.length > 10) G.battle.battleLog.pop();
    Notification.log(logMsg);
    if (G.battle.enemyHp <= 0) { this._win(enemy); return; }
    const edm = Damage.calc(enemy.atk, Stats.getDef());
    G.battle.hp = Math.max(0, G.battle.hp - edm);
    const elogMsg = enemy.name + 'の反撃！' + edm + 'ダメージ';
    G.battle.battleLog.unshift(elogMsg);
    Notification.log(elogMsg);
    if (G.battle.hp <= 0) {
      G.battle.hp = 1; G.battle.inBattle = false; G.battle.enemy = null;
      Notification.log('やられた…HP1で復活');
      EventBus.emit(GAME_EVENTS.BATTLE_LOSE, { enemyId: enemy.id });
    }
  },
  _win(enemy) {
    const rewards = BattleRewards.give(enemy);
    const logMsg = '✨' + enemy.name + 'を討伐！コイン+' + rewards.coin;
    G.battle.battleLog.unshift(logMsg);
    Notification.log(logMsg);
    G.battle.inBattle = false; G.battle.enemy = null;
    if (enemy.type === 'boss') EventBus.emit(GAME_EVENTS.BOSS_DEFEATED, { enemyId: enemy.id });
  },
  flee() {
    G.battle.inBattle = false; G.battle.enemy = null;
    Notification.log('逃げた！');
  },
  getDisplayList() {
    return EnemyManager.getAvailable().map(e => ({
      ...e,
      isFighting: G.battle.enemy === e.id,
      enemyHpPct: G.battle.enemy === e.id ? MathUtil.pct(Math.max(0, G.battle.enemyHp), e.hp) : 0,
    }));
  },
};
