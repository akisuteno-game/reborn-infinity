/* ============================================
   Reborn Infinity - js/player/player.js
   プレイヤー基本管理
   ============================================ */

const Player = {

  // ===== プレイヤー名取得 =====
  getName() {
    return G.player.name;
  },

  setName(name) {
    G.player.name = name || '名もなき者';
  },

  // ===== 称号 =====
  getTitle() {
    return G.titles.equipped || '';
  },

  setTitle(titleId) {
    if (!G.titles.unlocked.includes(titleId)) return false;
    G.titles.equipped = titleId;
    EventBus.emit(GAME_EVENTS.TITLE_UNLOCK, { titleId });
    return true;
  },

  // ===== 表示名（名前 + 称号） =====
  getDisplayName() {
    const title = this.getTitle();
    return title ? `【${title}】${this.getName()}` : this.getName();
  },

  // ===== 現在のTier =====
  getTier() {
    return G.tier;
  },

  // ===== Tier解放チェック =====
  canAdvanceTier() {
    // 各Tierの到達条件はPrestigeシステムで管理
    return false; // 暫定
  },

};
