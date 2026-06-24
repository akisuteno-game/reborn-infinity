/* js/prestige/rebirth/soulTree.js */
const SOUL_TREE_DATA = [
  { id: 'soul_xp_1',      name: 'XPの魂 I',      cat: 'xp',      cost: 100,  effect: { xp: 0.10 },   desc: 'XP+10%',     maxLevel: 10 },
  { id: 'soul_xp_2',      name: 'XPの魂 II',     cat: 'xp',      cost: 500,  effect: { xp: 0.20 },   desc: 'XP+20%',     maxLevel: 10, req: 'soul_xp_1' },
  { id: 'soul_coin_1',    name: 'コインの魂 I',   cat: 'coin',    cost: 100,  effect: { coin: 0.10 },  desc: 'コイン+10%', maxLevel: 10 },
  { id: 'soul_coin_2',    name: 'コインの魂 II',  cat: 'coin',    cost: 500,  effect: { coin: 0.20 },  desc: 'コイン+20%', maxLevel: 10, req: 'soul_coin_1' },
  { id: 'soul_life_1',    name: '寿命の魂 I',     cat: 'lifespan',cost: 200,  effect: { lifespan: 5 }, desc: '寿命+5年',   maxLevel: 10 },
  { id: 'soul_life_2',    name: '寿命の魂 II',    cat: 'lifespan',cost: 1000, effect: { lifespan: 10 },desc: '寿命+10年',  maxLevel: 10, req: 'soul_life_1' },
  { id: 'soul_skill_1',   name: 'スキルの魂 I',   cat: 'skill',   cost: 150,  effect: { skillXp: 0.10 },desc: 'スキルXP+10%', maxLevel: 10 },
  { id: 'soul_explore_1', name: '探索の魂 I',     cat: 'explore', cost: 150,  effect: { explore: 0.10 },desc: '探索速度+10%', maxLevel: 10 },
  { id: 'soul_craft_1',   name: 'クラフトの魂 I', cat: 'craft',   cost: 150,  effect: { craft: 0.10 }, desc: 'クラフト+10%', maxLevel: 10 },
  { id: 'soul_auto_1',    name: '自動化の魂 I',   cat: 'auto',    cost: 500,  effect: { autoEff: 0.10 },desc: '自動化効率+10%', maxLevel: 5 },
];
Object.freeze(SOUL_TREE_DATA);

const SoulTree = {
  getNode(id)   { return SOUL_TREE_DATA.find(n => n.id === id); },
  getLevel(id)  { return G.rebirth.soulTree?.[id] || 0; },
  canUpgrade(id) {
    const node = this.getNode(id);
    if (!node) return false;
    const lv = this.getLevel(id);
    if (lv >= node.maxLevel) return false;
    if (node.req && this.getLevel(node.req) < 1) return false;
    return G.resources.soulPoints >= node.cost;
  },
  upgrade(id) {
    if (!this.canUpgrade(id)) return false;
    const node = this.getNode(id);
    G.resources.soulPoints -= node.cost;
    if (!G.rebirth.soulTree) G.rebirth.soulTree = {};
    G.rebirth.soulTree[id] = (G.rebirth.soulTree[id] || 0) + 1;
    Notification.log('魂ツリー: ' + node.name + ' Lv' + G.rebirth.soulTree[id] + '！');
    Stats.update();
    return true;
  },
  getBonus(stat) {
    let total = 0;
    if (!G.rebirth?.soulTree) return total;
    for (const node of SOUL_TREE_DATA) {
      const lv = this.getLevel(node.id);
      if (lv > 0 && node.effect[stat]) total += node.effect[stat] * lv;
    }
    return total;
  },
  getDisplayList() {
    return SOUL_TREE_DATA.map(n => ({
      ...n, level: this.getLevel(n.id), canUpgrade: this.canUpgrade(n.id),
    }));
  },
};
