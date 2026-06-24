/* js/quests/mainQuests.js */
const MAIN_QUEST_DATA = [
  { id: 'tutorial',   name: 'チュートリアル',   desc: '村人として働き、名声5を獲得する',      cond: g => g.resources.fame >= 5,   reward: { coin: 100, mat: 10 }, chapter: 1 },
  { id: 'first_job',  name: '初めての転職',      desc: '村人以外の職業に就く',                 cond: g => g.jobs.changed > 0,      reward: { coin: 200, mat: 20 }, chapter: 1 },
  { id: 'first_kill', name: '初討伐',            desc: '敵を1体倒す',                          cond: g => g.battle.totalKills >= 1, reward: { coin: 300, mat: 30 }, chapter: 1 },
  { id: 'explore_5',  name: '探索者',            desc: '5回探索を完了する',                    cond: g => g.explore.totalExplored >= 5, reward: { coin: 500, mat: 50 }, chapter: 2 },
  { id: 'skill_10',   name: 'スキルマスター',    desc: 'スキルをLv10にする',                   cond: g => Object.values(g.skills.levels).some(v=>v>=10), reward: { coin: 800, mat: 80 }, chapter: 2 },
  { id: 'dragon_kill',name: 'ドラゴンスレイヤー',desc: 'ドラゴンを倒す',                       cond: g => g.battle.dragonKills >= 1, reward: { coin: 5000, mat: 200 }, chapter: 3 },
  { id: 'first_rebirth', name: '輪廻の始まり',   desc: '初めて転生する',                       cond: g => g.rebirth.count >= 1,    reward: { coin: 10000, soulFragments: 100 }, chapter: 4 },
];
Object.freeze(MAIN_QUEST_DATA);
