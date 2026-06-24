/* js/enemies/normalEnemies.js - 通常敵データ */
const NORMAL_ENEMIES = [
  { id: 'slime',      name: 'スライム',   icon: '💧', hp: 30,   atk: 3,   def: 1,   coin: 5,   exp: 10,  reqFame: 0,   type: 'normal' },
  { id: 'goblin',     name: 'ゴブリン',   icon: '👺', hp: 60,   atk: 8,   def: 3,   coin: 12,  exp: 25,  reqFame: 10,  type: 'normal' },
  { id: 'wolf',       name: 'オオカミ',   icon: '🐺', hp: 80,   atk: 12,  def: 4,   coin: 15,  exp: 30,  reqFame: 15,  type: 'normal' },
  { id: 'orc',        name: 'オーク',     icon: '👹', hp: 120,  atk: 15,  def: 8,   coin: 30,  exp: 60,  reqFame: 25,  type: 'normal' },
  { id: 'troll',      name: 'トロル',     icon: '🧌', hp: 200,  atk: 22,  def: 12,  coin: 50,  exp: 100, reqFame: 40,  type: 'normal' },
  { id: 'dark_elf',   name: 'ダークエルフ',icon: '🧝', hp: 160,  atk: 28,  def: 10,  coin: 60,  exp: 120, reqFame: 50,  type: 'normal' },
  { id: 'golem',      name: 'ゴーレム',   icon: '🗿', hp: 350,  atk: 30,  def: 25,  coin: 80,  exp: 150, reqFame: 60,  type: 'normal' },
  { id: 'vampire',    name: 'ヴァンパイア',icon: '🧛', hp: 280,  atk: 40,  def: 15,  coin: 100, exp: 200, reqFame: 70,  type: 'normal' },
  { id: 'demon',      name: '悪魔',       icon: '😈', hp: 500,  atk: 55,  def: 30,  coin: 200, exp: 400, reqFame: 85,  type: 'normal' },
  { id: 'arch_demon', name: '大悪魔',     icon: '👿', hp: 800,  atk: 75,  def: 45,  coin: 350, exp: 700, reqFame: 100, type: 'normal' },
];
Object.freeze(NORMAL_ENEMIES);
