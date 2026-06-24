/* js/quests/sideQuests.js */
const SIDE_QUEST_DATA = [
  { id: 'collector',   name: 'コレクター',    desc: '素材を100個集める',      cond: g => g.resources.materials >= 100, reward: { coin: 200 } },
  { id: 'rich',        name: 'お金持ち',      desc: 'コインを1000枚貯める',    cond: g => g.resources.coins >= 1000,    reward: { mat: 50 }   },
  { id: 'famous',      name: '有名人',        desc: '名声を100獲得する',       cond: g => g.resources.fame >= 100,      reward: { coin: 500 } },
  { id: 'crafter',     name: '職人',          desc: 'アイテムを5個クラフトする', cond: g => g.craft.totalCrafted >= 5, reward: { mat: 100 }  },
  { id: 'killer50',    name: '怪物退治',      desc: '敵を50体倒す',            cond: g => g.battle.totalKills >= 50,    reward: { coin: 1000} },
  { id: 'explorer10',  name: '冒険家',        desc: '10エリアを探索する',      cond: g => g.explore.visited.length >= 10, reward: { mat: 200 } },
];
Object.freeze(SIDE_QUEST_DATA);
