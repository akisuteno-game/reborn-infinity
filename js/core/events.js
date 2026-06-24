/* ============================================
   Reborn Infinity - js/core/events.js
   イベントバス（ゲーム内イベント管理）
   ============================================ */

const EventBus = {

  _listeners: {},

  // イベント登録
  on(event, callback) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  },

  // イベント登録解除
  off(event, callback) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
  },

  // イベント発火
  emit(event, data = {}) {
    if (!this._listeners[event]) return;
    this._listeners[event].forEach(cb => {
      try {
        cb(data);
      } catch (e) {
        console.error(`EventBus error on "${event}":`, e);
      }
    });
  },

  // 一度だけ受け取る
  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  },

  // 全リスナー削除
  clear(event) {
    if (event) {
      delete this._listeners[event];
    } else {
      this._listeners = {};
    }
  },

};

/* ===== ゲーム内イベント一覧（定数） =====
   使用されるイベント名を定義してタイポを防ぐ
   ============================================ */
const GAME_EVENTS = {
  // 時間
  YEAR_PASSED:       'yearPassed',
  LIFESPAN_END:      'lifespanEnd',

  // 職業
  JOB_LEVEL_UP:      'jobLevelUp',
  JOB_CHANGED:       'jobChanged',
  JOB_UNLOCKED:      'jobUnlocked',

  // スキル
  SKILL_LEVEL_UP:    'skillLevelUp',
  SKILL_LEARNED:     'skillLearned',

  // 戦闘
  BATTLE_START:      'battleStart',
  BATTLE_WIN:        'battleWin',
  BATTLE_LOSE:       'battleLose',
  BOSS_DEFEATED:     'bossDefeated',

  // 探索
  EXPLORE_START:     'exploreStart',
  EXPLORE_COMPLETE:  'exploreComplete',
  AREA_UNLOCKED:     'areaUnlocked',

  // クラフト
  CRAFT_SUCCESS:     'craftSuccess',
  CRAFT_FAIL:        'craftFail',

  // 転生
  REBIRTH:           'rebirth',
  TIER_UP:           'tierUp',

  // 実績
  ACHIEVEMENT_UNLOCK: 'achievementUnlock',
  TITLE_UNLOCK:       'titleUnlock',

  // クエスト
  QUEST_COMPLETE:    'questComplete',
  QUEST_UNLOCK:      'questUnlock',

  // UI
  TAB_CHANGED:       'tabChanged',
  NOTIFICATION:      'notification',
  SAVE:              'save',
  LOAD:              'load',
};

Object.freeze(GAME_EVENTS);
