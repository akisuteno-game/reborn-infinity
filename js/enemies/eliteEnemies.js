/* js/enemies/eliteEnemies.js - 精鋭敵データ */
const ELITE_ENEMIES = [
  { id: 'elite_goblin',  name: '精鋭ゴブリン', icon: '👺', hp: 200,   atk: 25,  def: 10,  coin: 50,   exp: 100,  reqFame: 20,  type: 'elite' },
  { id: 'elite_orc',     name: '精鋭オーク',   icon: '👹', hp: 400,   atk: 45,  def: 20,  coin: 100,  exp: 200,  reqFame: 40,  type: 'elite' },
  { id: 'elite_demon',   name: '精鋭悪魔',     icon: '😈', hp: 1000,  atk: 80,  def: 50,  coin: 300,  exp: 600,  reqFame: 90,  type: 'elite' },
  { id: 'void_knight',   name: '虚無の騎士',   icon: '🗡️', hp: 5000,  atk: 200, def: 150, coin: 2000, exp: 5000, reqFame: 500, type: 'elite', reqTier: 14 },
];
Object.freeze(ELITE_ENEMIES);
