/* ============================================
   Reborn Infinity - js/core/config.js
   ゲーム設定（プレイヤーが変更可能な設定）
   ============================================ */

const Config = {

  // デフォルト設定
  _defaults: {
    // ゲームプレイ
    speed:           1,
    autoSave:        true,
    autoSaveInterval: 30,   // 秒
    offlineProgress: true,

    // 通知
    showLevelUpNotif:  true,
    showAchievNotif:   true,
    showBattleLog:     true,
    showFloatNumbers:  true,

    // UI
    theme:          'default',
    language:       'ja',
    sidebarCollapsed: false,
    numberFormat:   'short',  // 'short' | 'comma' | 'scientific'
    showTooltips:   true,

    // 戦闘
    autoBattle:     false,
    autoHeal:       false,

    // オート
    autoExplore:    false,
    autoCraft:      false,
    autoEquip:      false,
    autoJob:        false,
    autoRebirth:    false,
  },

  // 現在の設定（セーブデータから上書き）
  _current: {},

  // 初期化
  init(savedConfig = {}) {
    this._current = { ...this._defaults, ...savedConfig };
  },

  // 取得
  get(key) {
    return key in this._current ? this._current[key] : this._defaults[key];
  },

  // 設定
  set(key, value) {
    if (!(key in this._defaults)) {
      console.warn(`Config: unknown key "${key}"`);
      return;
    }
    this._current[key] = value;
    EventBus.emit('configChanged', { key, value });
  },

  // 全設定を取得（セーブ用）
  getAll() {
    return { ...this._current };
  },

  // リセット
  reset(key) {
    if (key) {
      this._current[key] = this._defaults[key];
    } else {
      this._current = { ...this._defaults };
    }
  },

};
