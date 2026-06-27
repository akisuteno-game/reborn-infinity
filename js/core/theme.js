/* ============================================
   Reborn Infinity - js/core/theme.js
   テーママネージャー
   ============================================ */

const ThemeManager = {
  apply(theme) {
    document.body.className = 'theme-' + (theme || 'default');
  },
};
