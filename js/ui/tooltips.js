/* js/ui/tooltips.js */
const Tooltips = {
  show(el, content) {
    const tip = document.getElementById('tooltip');
    if (!tip) return;
    tip.innerHTML = content;
    tip.style.display = 'block';
    const rect = el.getBoundingClientRect();
    tip.style.left = Math.min(rect.left, window.innerWidth - 300) + 'px';
    tip.style.top  = (rect.bottom + 8) + 'px';
  },
  hide() {
    const tip = document.getElementById('tooltip');
    if (tip) tip.style.display = 'none';
  },
};
document.addEventListener('touchstart', () => Tooltips.hide(), { passive: true });
