/* js/ui/animations.js */
const UIAnimations = {
  floatNumber(x, y, text, type = 'xp') {
    const el = document.createElement('div');
    el.className = 'float-number ' + type;
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  },
  levelUpFlash(el) {
    if (!el) return;
    el.classList.add('anim-levelUp');
    setTimeout(() => el.classList.remove('anim-levelUp'), 500);
  },
};
