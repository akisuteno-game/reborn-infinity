/* js/ui/themeManager.js */
const ThemeManager = {
  themes: ['default','light','void','divine','cosmic','creator'],
  apply(theme) {
    document.body.className = 'theme-' + (theme || 'default');
    this.setTierTheme(G.tier || 0);
  },
  setTierTheme(tier) {
    document.documentElement.style.setProperty('--color-accent', 'var(--accent-tier' + tier + ')');
    document.documentElement.style.setProperty('--color-accent-glow',
      'color-mix(in srgb, var(--accent-tier' + tier + ') 40%, transparent)');
    const el = document.getElementById('current-tier');
    if (el) el.textContent = tier;
    const nameEl = document.getElementById('current-tier-name');
    const tierNames = ['人生','転生','覚醒','超越','神格化','宇宙創造','多元宇宙','次元','無限','永遠','現実','時空','因果律','概念','虚無','創造主'];
    if (nameEl) nameEl.textContent = tierNames[tier] || '';
  },
};
