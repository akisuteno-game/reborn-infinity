/* ============================================
   Reborn Infinity - js/player/traits.js
   特性・素質管理（転生引き継ぎ要素）
   ============================================ */

const Traits = {

  // 利用可能な特性一覧
  _data: [
    { id: 'hardworker',  name: '努力家',    desc: 'XP獲得+10%',         effect: 'xp',    value: 0.10 },
    { id: 'merchant',    name: '商才',       desc: 'コイン獲得+10%',      effect: 'coin',  value: 0.10 },
    { id: 'explorer',    name: '探求心',     desc: '探索速度+10%',        effect: 'explore', value: 0.10 },
    { id: 'warrior',     name: '武人',       desc: 'ATK+5',              effect: 'atk',   value: 5 },
    { id: 'longevity',   name: '長命',       desc: '寿命+5年',            effect: 'lifespan', value: 5 },
    { id: 'lucky',       name: '幸運児',     desc: 'レアドロップ率+5%',   effect: 'luck',  value: 0.05 },
    { id: 'craftsman',   name: '職人気質',   desc: 'クラフト成功率+10%',  effect: 'craft', value: 0.10 },
    { id: 'scholar',     name: '学者',       desc: 'スキルXP+10%',       effect: 'skillXp', value: 0.10 },
  ],

  getAll()   { return this._data; },
  getById(id){ return this._data.find(t => t.id === id); },

  // 現在保有している特性
  getOwned() { return G.player.traits || []; },

  // 特性効果を取得
  getBonus(effect) {
    const owned = this.getOwned();
    return this._data
      .filter(t => owned.includes(t.id) && t.effect === effect)
      .reduce((sum, t) => sum + t.value, 0);
  },

  // 特性を付与（転生チャレンジ等の報酬）
  add(traitId) {
    if (!G.player.traits) G.player.traits = [];
    if (!G.player.traits.includes(traitId)) {
      G.player.traits.push(traitId);
    }
  },

};
