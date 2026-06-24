/* js/exploration/regions.js - 地域データ */
const REGION_DATA = [
  { id: 'village_outskirts', name: '村の外れ',   icon: '🏘️', reqFame: 0,   ticks: 50,  mat: 2,  coin: 5,   desc: '初心者向けエリア',   biome: 'plain' },
  { id: 'forest',            name: '深い森',     icon: '🌲', reqFame: 10,  ticks: 80,  mat: 4,  coin: 10,  desc: '木と獣が住む森',      biome: 'forest' },
  { id: 'cave',              name: '洞窟',       icon: '🪨', reqFame: 25,  ticks: 120, mat: 8,  coin: 20,  desc: '鉱石が眠る洞窟',      biome: 'cave' },
  { id: 'swamp',             name: '毒沼',       icon: '🌿', reqFame: 35,  ticks: 140, mat: 7,  coin: 18,  desc: '毒素と薬草の宝庫',    biome: 'swamp' },
  { id: 'mountain',          name: '険しい山',   icon: '⛰️', reqFame: 40,  ticks: 150, mat: 10, coin: 25,  desc: '高山の鉱石と宝',      biome: 'mountain' },
  { id: 'ruins',             name: '古代遺跡',   icon: '🏛️', reqFame: 50,  ticks: 200, mat: 15, coin: 50,  desc: '古代の遺物が眠る',    biome: 'ruin' },
  { id: 'volcano',           name: '火山地帯',   icon: '🌋', reqFame: 65,  ticks: 220, mat: 18, coin: 60,  desc: '溶岩と火属性素材',    biome: 'volcano' },
  { id: 'ocean',             name: '深海',       icon: '🌊', reqFame: 70,  ticks: 250, mat: 20, coin: 70,  desc: '海底の宝を探す',      biome: 'ocean' },
  { id: 'dragon_nest',       name: '竜の巣',     icon: '🐉', reqFame: 100, ticks: 350, mat: 40, coin: 120, desc: '伝説の竜が住む地',    biome: 'dragon' },
  { id: 'celestial_realm',   name: '天界',       icon: '☁️', reqFame: 200, ticks: 500, mat: 80, coin: 300, desc: '神の領域への入口',    biome: 'divine', reqRebirth: 1 },
  { id: 'void_rift',         name: '虚無の裂け目',icon: '🕳️', reqFame: 500, ticks: 800, mat: 200, coin: 1000, desc: '虚無が広がる異次元', biome: 'void', reqTier: 14 },
  { id: 'creator_realm',     name: '創造主の領域',icon: '🌟', reqFame: 9999, ticks: 9999, mat: 9999, coin: 9999, desc: '全ての始まりの地', biome: 'creator', reqTier: 15 },
];
Object.freeze(REGION_DATA);
