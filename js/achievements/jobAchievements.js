/* js/achievements/jobAchievements.js */
const JOB_ACHIEVEMENTS = [
  { id: 'job_1',  name: 'はじめての転職',  desc: '職業を変更する',              icon: '⚔️', rarity: 'common',   points: 5,  check: g => g.jobs.changed > 0, title: '見習い冒険者' },
  { id: 'job_2',  name: '熟練者',          desc: '職業をLv10にする',            icon: '★',  rarity: 'common',   points: 10, check: g => Object.values(g.jobs.levels).some(v=>v>=10) },
  { id: 'job_3',  name: '達人',            desc: '職業をLv50にする',            icon: '💎', rarity: 'rare',     points: 30, check: g => Object.values(g.jobs.levels).some(v=>v>=50), title: '達人' },
  { id: 'job_4',  name: '伝説の職人',      desc: '職業をLv100にする',           icon: '🏆', rarity: 'epic',     points: 60, check: g => Object.values(g.jobs.levels).some(v=>v>=100), title: '伝説の職人' },
  { id: 'job_5',  name: '多才',            desc: '5種類以上の職業を解放する',   icon: '🎭', rarity: 'uncommon', points: 20, check: g => g.jobs.unlocked.length >= 5 },
  { id: 'job_6',  name: '職業コレクター',  desc: '20種類以上の職業を解放する',  icon: '📚', rarity: 'rare',     points: 40, check: g => g.jobs.unlocked.length >= 20 },
  { id: 'job_7',  name: '英雄への道',      desc: '英雄職業を解放する',          icon: '⚡', rarity: 'epic',     points: 80, check: g => g.jobs.unlocked.includes('hero'), title: '英雄' },
];
Object.freeze(JOB_ACHIEVEMENTS);
