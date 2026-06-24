/* js/combat/battleRewards.js - 戦闘報酬 */
const BattleRewards = {
  give(enemy) {
    const coin = Math.floor(enemy.coin * Stats.getCoinMult());
    const fame = Math.floor(enemy.coin * 0.5 * Stats.getFameMult());
    G.resources.coins += coin;
    G.resources.fame  += fame;
    G.battle.totalKills++;
    if (enemy.type === 'boss')  G.battle.bossKills++;
    if (enemy.id === 'dragon')  G.battle.dragonKills++;
    if (enemy.id === 'demon_lord') G.battle.demonKills++;
    G.battle.killsByEnemy[enemy.id] = (G.battle.killsByEnemy[enemy.id] || 0) + 1;
    if (!G.collection.enemies.includes(enemy.id)) G.collection.enemies.push(enemy.id);
    EventBus.emit(GAME_EVENTS.BATTLE_WIN, { enemyId: enemy.id, coin, fame });
    return { coin, fame };
  },
};
