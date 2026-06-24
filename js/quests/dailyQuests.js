/* js/quests/dailyQuests.js */
const DailyQuests = {
  _pool: [
    { id: 'daily_kill',    name: '今日の討伐',   desc: '敵を10体倒す',      target: 10, stat: 'kills',    reward: { coin: 100 } },
    { id: 'daily_explore', name: '今日の探索',   desc: '3回探索する',        target: 3,  stat: 'explore',  reward: { mat: 30   } },
    { id: 'daily_craft',   name: '今日のクラフト',desc: '2個クラフトする',   target: 2,  stat: 'craft',    reward: { coin: 150 } },
  ],
  _today: null,
  getToday() {
    if (!this._today) this._today = RNG.pickN(this._pool, 3);
    return this._today;
  },
  refresh() { this._today = null; },
};
