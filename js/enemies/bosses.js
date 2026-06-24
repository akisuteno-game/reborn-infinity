/* js/enemies/bosses.js - ボスデータ */
const BOSS_DATA = [
  { id: 'goblin_king',   name: 'ゴブリンキング',   icon: '👑', hp: 500,    atk: 40,   def: 20,   coin: 200,   exp: 500,   reqFame: 30,   type: 'boss' },
  { id: 'orc_warlord',   name: 'オーク武将',       icon: '⚔️', hp: 1200,   atk: 70,   def: 40,   coin: 500,   exp: 1200,  reqFame: 60,   type: 'boss' },
  { id: 'dragon',        name: 'ドラゴン',         icon: '🐉', hp: 3000,   atk: 120,  def: 80,   coin: 1500,  exp: 3000,  reqFame: 100,  type: 'boss' },
  { id: 'demon_lord',    name: '魔王',             icon: '👿', hp: 8000,   atk: 200,  def: 130,  coin: 5000,  exp: 10000, reqFame: 150,  type: 'boss' },
  { id: 'ancient_god',   name: '古代神',           icon: '⚡', hp: 50000,  atk: 500,  def: 300,  coin: 30000, exp: 60000, reqFame: 400,  type: 'boss', reqRebirth: 2 },
  { id: 'void_god',      name: '虚無神',           icon: '🕳️', hp: 999999, atk: 9999, def: 5000, coin: 999999, exp: 999999, reqFame: 9999, type: 'boss', reqTier: 14 },
];
Object.freeze(BOSS_DATA);
