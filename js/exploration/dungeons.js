/* js/exploration/dungeons.js - ダンジョンデータ */
const DUNGEON_DATA = [
  { id: 'goblin_cave',    name: 'ゴブリンの巣穴', icon: '👺', reqFame: 15,  floors: 10, rewardMat: 20,  rewardCoin: 50,  desc: 'ゴブリンが群れる洞窟' },
  { id: 'ancient_tomb',   name: '古代の墓',       icon: '⚰️', reqFame: 40,  floors: 20, rewardMat: 60,  rewardCoin: 150, desc: '古代王の呪われた墓' },
  { id: 'dragon_tower',   name: '竜の塔',         icon: '🐲', reqFame: 80,  floors: 30, rewardMat: 150, rewardCoin: 400, desc: '竜が守る危険な塔' },
  { id: 'void_dungeon',   name: '虚無のダンジョン',icon: '🕳️', reqFame: 500, floors: 100, rewardMat: 2000, rewardCoin: 5000, desc: '虚無に飲まれた迷宮', reqTier: 14 },
];
Object.freeze(DUNGEON_DATA);
