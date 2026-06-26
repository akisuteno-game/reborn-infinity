/* ============================================
   Reborn Infinity - js/ui.js
   UI・通知・ステータス・ゲームループ 統合ファイル
   （個別ファイル実装までの暫定版）
   ============================================ */

// ===== 未実装モジュールのスタブ =====

const SoulTree = {
  getBonus(stat) { return 0; },
};

// ExplorationManager（ui.js内で定義）
const ExplorationManager = {
  tick(G) {
    if (!G.explore.current) return;
    const area = EXPLORE_DATA.find(a => a.id === G.explore.current);
    if (!area) return;
    G.explore.progress++;
    if (G.explore.progress >= area.ticks) {
      const mat  = RNG.varyInt(area.mat, 0.3);
      const coin = RNG.varyInt(area.coin, 0.3);
      G.resources.materials += mat * Stats.getMatMult();
      G.resources.coins     += coin * Stats.getCoinMult();
      if (!G.explore.visited.includes(area.id)) G.explore.visited.push(area.id);
      G.explore.totalExplored++;
      Notification.log(`${area.name}から帰還！素材+${mat} コイン+${coin}`);
      G.explore.current  = null;
      G.explore.progress = 0;
    }
  },
};

// CombatManager（ui.js内で定義）
const CombatManager = {
  tick(G) {},
  startBattle(enemyId) {
    const enemy = ENEMY_DATA.find(e => e.id === enemyId);
    if (!enemy || G.resources.fame < enemy.reqFame) return false;
    G.battle.enemy    = enemyId;
    G.battle.enemyHp  = enemy.hp;
    G.battle.inBattle = true;
    G.battle.battleLog = [];
    Notification.log(enemy.name + 'が現れた！');
    return true;
  },
  attack() {
    if (!G.battle.inBattle || !G.battle.enemy) return;
    const enemy = ENEMY_DATA.find(e => e.id === G.battle.enemy);
    const isCrit = RNG.chance(Stats.getCritRate());
    let dmg = MathUtil.calcDamage(Stats.getAtk(), enemy.def);
    if (isCrit) dmg = MathUtil.calcCritDamage(dmg, Stats.getCritMult());
    G.battle.enemyHp -= dmg;
    Notification.log((isCrit ? '会心！' : '') + enemy.name + 'に' + dmg + 'ダメージ！');
    if (G.battle.enemyHp <= 0) {
      this._win(enemy);
      return;
    }
    const edm = MathUtil.calcDamage(enemy.atk, Stats.getDef());
    G.battle.hp = Math.max(0, G.battle.hp - edm);
    Notification.log(enemy.name + 'の反撃！' + edm + 'ダメージ');
    if (G.battle.hp <= 0) {
      G.battle.hp = 1;
      G.battle.inBattle = false;
      G.battle.enemy    = null;
      Notification.log('やられた…HP1で復活');
    }
    UIManager.render();
  },
  _win(enemy) {
    G.battle.totalKills++;
    if (!G.battle.killsByEnemy) G.battle.killsByEnemy = {};
    G.battle.killsByEnemy[enemy.id] = (G.battle.killsByEnemy[enemy.id] || 0) + 1;
    if (enemy.id === 'dragon') G.battle.dragonKills++;
    if (enemy.id === 'demon')  G.battle.demonKills++;
    G.resources.coins += enemy.coin;
    G.resources.fame  += enemy.coin * 0.5;
    Notification.log(enemy.name + 'を討伐！コイン+' + enemy.coin);
    G.battle.inBattle = false;
    G.battle.enemy    = null;
    EventBus.emit(GAME_EVENTS.BATTLE_WIN, { enemyId: enemy.id });
    UIManager.render();
  },
};

const EventManager = {
  tick(G) {},
};

const AutomationSystem = {
  tick(G) {
    if (G.automation.rebirth && G.time.isDead) {
      // 自動転生は転生ボタン処理と同等の処理をGameLoopが行う
      EventBus.emit('autoRebirth', {});
    }
  },
};

const ThemeManager = {
  apply(theme) {
    document.body.className = 'theme-' + (theme || 'default');
  },
};

// ===== 通知システム =====
const Notification = {
  _log: [],
  show(title, msg, type) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');
    toast.innerHTML = `<div class="toast-body"><div class="toast-title">${title}</div>${msg ? '<div class="toast-msg">' + msg + '</div>' : ''}</div>`;
    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(toast);
      setTimeout(() => { toast.classList.add('toast-out'); setTimeout(() => toast.remove(), 300); }, CONSTANTS.TOAST_DURATION_MS);
    }
  },
  log(msg) {
    this._log.unshift(msg);
    if (this._log.length > CONSTANTS.LOG_MAX_ENTRIES) this._log.pop();
  },
  getLogs() { return this._log; },
};

// ===== 探索データ =====
const EXPLORE_DATA = [
  { id: 'village_outskirts', name: '村の外れ',  reqFame: 0,  ticks: 50,  mat: 2,  coin: 5,  desc: '初心者向け' },
  { id: 'forest',            name: '近くの森',  reqFame: 10, ticks: 80,  mat: 4,  coin: 10, desc: '名声10が必要' },
  { id: 'cave',              name: '洞窟',      reqFame: 25, ticks: 120, mat: 8,  coin: 20, desc: '名声25が必要' },
  { id: 'ruins',             name: '古代遺跡',  reqFame: 50, ticks: 200, mat: 15, coin: 50, desc: '名声50が必要' },
  { id: 'dragon_nest',       name: '竜の巣',   reqFame: 100,ticks: 350, mat: 40, coin: 120,desc: '名声100が必要' },
];

// ===== 敵データ =====
const ENEMY_DATA = [
  { id: 'slime',  name: 'スライム', hp: 30,  atk: 3,  def: 1,  coin: 5,   reqFame: 0  },
  { id: 'goblin', name: 'ゴブリン', hp: 60,  atk: 8,  def: 3,  coin: 12,  reqFame: 10 },
  { id: 'orc',    name: 'オーク',   hp: 120, atk: 15, def: 8,  coin: 30,  reqFame: 25 },
  { id: 'dragon', name: 'ドラゴン', hp: 300, atk: 35, def: 20, coin: 100, reqFame: 60 },
  { id: 'demon',  name: '魔王',     hp: 600, atk: 60, def: 35, coin: 300, reqFame: 90 },
];

// ===== Stats（js/player/stats.js で定義済み） =====

// ===== UIManager =====
const UIManager = {
  _currentTab: 'status',

  init() {
    this._bindNavTabs();
    this._bindSpeedButtons();
    this._bindPauseButton();
    this.showTab('status');
  },

  _bindNavTabs() {
    document.querySelectorAll('.nav-tab').forEach(btn => {
      let touched = false;
      btn.addEventListener('touchstart', e => {
        e.preventDefault(); touched = true;
        this.showTab(btn.dataset.tab);
        document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }, { passive: false });
      btn.addEventListener('click', () => {
        if (touched) { touched = false; return; }
        this.showTab(btn.dataset.tab);
        document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  _bindSpeedButtons() {
    document.querySelectorAll('.btn-speed').forEach(btn => {
      let touched = false;
      btn.addEventListener('touchstart', e => {
        e.preventDefault(); touched = true;
        GameLoop.setSpeed(parseInt(btn.dataset.speed));
        document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }, { passive: false });
      btn.addEventListener('click', () => {
        if (touched) { touched = false; return; }
        GameLoop.setSpeed(parseInt(btn.dataset.speed));
        document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  _bindPauseButton() {
    const btn = document.getElementById('btn-pause');
    if (!btn) return;
    let touched = false;
    btn.addEventListener('touchstart', e => {
      e.preventDefault(); touched = true;
      const paused = GameLoop.togglePause();
      btn.textContent = paused ? '再開' : '停止';
      btn.classList.toggle('paused', paused);
    }, { passive: false });
    btn.addEventListener('click', () => {
      if (touched) { touched = false; return; }
      const paused = GameLoop.togglePause();
      btn.textContent = paused ? '再開' : '停止';
      btn.classList.toggle('paused', paused);
    });
  },

  showTab(tabName) {
    this._currentTab = tabName;
    const el = document.getElementById('tab-content');
    if (!el) return;
    el.innerHTML = this._renderTab(tabName);
    this._bindTabEvents(tabName);
  },

  showRebirthNotice() {
    const badge = document.getElementById('rebirth-badge');
    if (badge) badge.classList.remove('hidden');
    Notification.show('寿命が尽きた…', '転生タブで転生できます', 'warning');
  },

  render() {
    this._renderHeader();
    if (this._currentTab) {
      const el = document.getElementById('tab-content');
      if (el) el.innerHTML = this._renderTab(this._currentTab);
      this._bindTabEvents(this._currentTab);
    }
  },

  _renderHeader() {
    const el = document.getElementById('header-stats');
    if (!el) return;
    el.innerHTML = `
      <div class="header-stat-item"><span class="header-stat-icon">🎂</span><span class="header-stat-val age">${G.time.age}歳</span></div>
      <div class="header-stat-item"><span class="header-stat-icon">💰</span><span class="header-stat-val coin">${NumberUtil.format(G.resources.coins)}</span></div>
      <div class="header-stat-item"><span class="header-stat-icon">⭐</span><span class="header-stat-val fame">${NumberUtil.format(G.resources.fame)}</span></div>
    `;
  },

  _renderTab(name) {
    switch (name) {
      case 'status':        return this._tabStatus();
      case 'jobs':          return this._tabJobs();
      case 'skills':        return this._tabSkills();
      case 'explore':       return this._tabExplore();
      case 'combat':        return this._tabCombat();
      case 'equipment':     return this._tabEquipment();
      case 'craft':         return this._tabCraft();
      case 'inventory':     return this._tabInventory();
      case 'pets':          return this._tabPets();
      case 'quests':        return this._tabQuests();
      case 'achievements':  return this._tabAchievements();
      case 'titles':        return this._tabTitles();
      case 'collection':    return this._tabCollection();
      case 'rebirth':       return this._tabRebirth();
      case 'awakening':     return this._tabAwakening();
      case 'transcendence': return this._tabTranscendence();
      case 'divinity':      return this._tabDivinity();
      case 'universe':      return this._tabUniverse();
      case 'automation':    return this._tabAutomation();
      case 'settings':      return this._tabSettings();
      default:              return `<div class="empty-state"><div class="empty-state-icon">🚧</div><div class="empty-state-text">準備中...</div></div>`;
    }
  },

  // ===== ステータスタブ =====
  _tabStatus() {
    const agePct     = TimeSystem.getAgePct(G).toFixed(1);
    const hpPct      = MathUtil.pct(G.battle.hp, G.battle.maxHp).toFixed(1);
    const mpPct      = MathUtil.pct(G.battle.mp, G.battle.maxMp).toFixed(1);
    const job        = JobUnlocks.getById(G.jobs.current);
    const skill      = SkillUnlocks.getById(G.skills.current);
    const jlv        = G.jobs.levels[G.jobs.current] || 1;
    const jxp        = G.jobs.xp[G.jobs.current] || 0;
    const jreq       = JobExp.getRequired(G.jobs.current, jlv);
    const slv        = G.skills.levels[G.skills.current] || 1;
    const sxp        = G.skills.xp[G.skills.current] || 0;
    const sreq       = SkillManager._xpRequired(G.skills.current, slv);
    const logs       = Notification.getLogs().slice(0, 10);

    return `
    <div class="grid-2" style="gap:8px">
      <div class="panel">
        <div class="panel-title">📊 ステータス</div>
        <div class="stat-row"><span class="stat-label">年齢</span><span class="stat-value">${G.time.age}歳 ${G.time.day}日</span></div>
        <div class="bar-wrap bar-sm" style="margin:4px 0 8px"><div class="bar-fill bar-age" style="width:${agePct}%"></div></div>
        <div class="stat-row"><span class="stat-label">寿命</span><span class="stat-value">${G.time.lifespan}年</span></div>
        <div class="stat-row"><span class="stat-label">HP</span><span class="stat-value">${Math.floor(G.battle.hp)} / ${G.battle.maxHp}</span></div>
        <div class="bar-wrap bar-sm" style="margin:2px 0 8px"><div class="bar-fill bar-hp" style="width:${hpPct}%"></div></div>
        <div class="stat-row"><span class="stat-label">MP</span><span class="stat-value">${Math.floor(G.battle.mp)} / ${G.battle.maxMp}</span></div>
        <div class="bar-wrap bar-sm" style="margin:2px 0 8px"><div class="bar-fill bar-mp" style="width:${mpPct}%"></div></div>
        <div class="stat-row"><span class="stat-label">ATK</span><span class="stat-value">${Stats.getAtk()}</span></div>
        <div class="stat-row"><span class="stat-label">DEF</span><span class="stat-value">${Stats.getDef()}</span></div>
        <div class="stat-row"><span class="stat-label">会心率</span><span class="stat-value">${(Stats.getCritRate()*100).toFixed(1)}%</span></div>
        <div class="stat-row"><span class="stat-label">コイン</span><span class="stat-value" style="color:var(--color-coin)">${NumberUtil.format(G.resources.coins)}</span></div>
        <div class="stat-row"><span class="stat-label">名声</span><span class="stat-value" style="color:var(--color-fame)">${NumberUtil.format(G.resources.fame)}</span></div>
        <div class="stat-row"><span class="stat-label">素材</span><span class="stat-value" style="color:var(--color-mat)">${NumberUtil.format(G.resources.materials)}</span></div>
        ${G.rebirth.count > 0 ? `<div class="stat-row"><span class="stat-label">魂の欠片</span><span class="stat-value" style="color:var(--color-soul)">${NumberUtil.format(G.resources.soulFragments)}</span></div>` : ''}
      </div>
      <div class="panel">
        <div class="panel-title">⚡ 現在の活動</div>
        <div class="active-panel">
          <div class="active-panel-label">職業</div>
          <div class="flex-between" style="margin-bottom:4px">
            <span style="font-weight:500">${job ? job.icon + ' ' + job.name : '—'}</span>
            <span class="lv-badge">Lv${jlv}</span>
          </div>
          <div class="mb"><div class="bw" style="flex:1;height:6px"><div class="bf bar-xp" style="width:${MathUtil.pct(jxp,jreq).toFixed(1)}%"></div></div>
          <span style="font-size:10px;color:var(--color-text-sub)">${NumberUtil.format(jxp)}/${NumberUtil.format(jreq)}</span></div>
        </div>
        <div class="active-panel">
          <div class="active-panel-label">スキル訓練</div>
          <div class="flex-between" style="margin-bottom:4px">
            <span style="font-weight:500">${skill ? skill.icon + ' ' + skill.name : '—'}</span>
            <span class="lv-badge" style="background:color-mix(in srgb,var(--color-xp) 15%,transparent);color:var(--color-xp)">Lv${slv}</span>
          </div>
          <div class="mb"><div class="bw" style="flex:1;height:6px"><div class="bf" style="background:var(--color-xp);width:${MathUtil.pct(sxp,sreq).toFixed(1)}%"></div></div>
          <span style="font-size:10px;color:var(--color-text-sub)">${NumberUtil.format(sxp)}/${NumberUtil.format(sreq)}</span></div>
        </div>
        <div class="panel-title" style="margin-top:8px">📋 ログ</div>
        <div class="log-panel">${logs.map(l => `<div class="log-item">${l}</div>`).join('') || '<div class="log-item">ログなし</div>'}</div>
      </div>
    </div>`;
  },

  // ===== 職業タブ =====
  _tabJobs() {
    const jobs = JobManager.getDisplayList();
    const cats = [...new Set(jobs.map(j => j.category))];
    return `
    <div class="panel">
      <div class="panel-title">⚔️ 職業（${jobs.filter(j=>j.isUnlocked).length}解放済み）</div>
      <div style="font-size:11px;color:var(--color-text-sub);margin-bottom:10px">XP倍率: ${NumberUtil.mult(Stats.getXpMult())} | コイン倍率: ${NumberUtil.mult(Stats.getCoinMult())}</div>
      ${jobs.map(j => `
        <div class="job-card${j.isActive?' active':''}${!j.isUnlocked?' locked':''}" data-job="${j.id}" style="touch-action:manipulation">
          <div class="job-card-header">
            <span class="job-name">${j.icon} ${j.name}</span>
            <div class="flex" style="gap:6px;align-items:center">
              <span class="lv-badge">Lv${j.level}</span>
              <span class="badge badge-${j.isActive?'job':'skill'}" style="font-size:9px">${j.isActive?'訓練中':'選択'}</span>
            </div>
          </div>
          <div class="job-desc">${!j.isUnlocked ? '🔒 ' + j.unlockDesc : j.desc + ' | +' + j.income + 'コイン/日'}</div>
          ${j.isUnlocked ? `<div class="mb"><div class="bw" style="flex:1;height:5px"><div class="bf bar-xp" style="width:${j.xpPct.toFixed(1)}%"></div></div><span style="font-size:10px;color:var(--color-text-sub)">${j.xpPct.toFixed(0)}%</span></div>` : ''}
        </div>`).join('')}
    </div>`;
  },

  // ===== スキルタブ =====
  _tabSkills() {
    const skills   = SkillManager.getDisplayList();
    const synergies = SkillManager.getActiveSynergies();
    return `
    <div class="panel">
      <div class="panel-title">📖 スキル（${skills.filter(s=>s.isUnlocked).length}解放済み）</div>
      ${synergies.length ? `<div class="lead-panel" style="margin-bottom:10px">✨ アクティブシナジー: ${synergies.map(s=>s.name).join('、')}</div>` : ''}
      ${skills.map(s => `
        <div class="job-card${s.isActive?' active':''}${!s.isUnlocked?' locked':''}" data-skill="${s.id}" style="touch-action:manipulation;--sel-c:var(--color-xp)">
          <div class="job-card-header">
            <span class="job-name">${s.icon} ${s.name}</span>
            <span class="lv-badge" style="background:color-mix(in srgb,var(--color-xp) 15%,transparent);color:var(--color-xp)">Lv${s.level}</span>
          </div>
          <div class="job-desc">${!s.isUnlocked ? '🔒 ' + s.unlockDesc : s.desc}</div>
          ${s.isUnlocked ? `<div class="mb"><div class="bw" style="flex:1;height:5px"><div class="bf bar-xp" style="width:${s.xpPct.toFixed(1)}%"></div></div><span style="font-size:10px;color:var(--color-text-sub)">${s.xpPct.toFixed(0)}%</span></div>` : ''}
        </div>`).join('')}
    </div>`;
  },

  // ===== 探索タブ =====
  _tabExplore() {
    return `
    <div class="panel">
      <div class="panel-title">🗺️ 探索エリア</div>
      ${EXPLORE_DATA.map(a => {
        const locked   = G.resources.fame < a.reqFame;
        const active   = G.explore.current === a.id;
        const pct      = active ? MathUtil.pct(G.explore.progress, a.ticks).toFixed(1) : 0;
        return `
        <div class="enemy-card${active?' fighting':''}${locked?' locked':''}" data-explore="${a.id}" style="touch-action:manipulation">
          <div class="rh flex-between">
            <span style="font-weight:500">${a.name}</span>
            <span class="badge badge-${active?'job':locked?'danger':'skill'}">${locked?'名声'+a.reqFame+'が必要':active?'探索中 '+pct+'%':'出発'}</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${a.desc} | 素材+${a.mat} コイン+${a.coin}</div>
          ${active ? `<div class="bar-wrap bar-sm" style="margin-top:5px"><div class="bar-fill" style="background:var(--color-danger);width:${pct}%"></div></div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===== 戦闘タブ =====
  _tabCombat() {
    const inBattle = G.battle.inBattle && G.battle.enemy;
    const enemy    = inBattle ? ENEMY_DATA.find(e => e.id === G.battle.enemy) : null;
    const hpPct    = inBattle ? MathUtil.pct(G.battle.hp, G.battle.maxHp).toFixed(1) : 100;
    const ehpPct   = inBattle ? MathUtil.pct(Math.max(0,G.battle.enemyHp), enemy.hp).toFixed(1) : 100;
    return `
    <div class="panel">
      <div class="panel-title">🗡️ 敵リスト</div>
      ${ENEMY_DATA.map(e => {
        const locked = G.resources.fame < e.reqFame;
        const sel    = G.battle.enemy === e.id;
        return `
        <div class="enemy-card${sel?' fighting':''}${locked?' locked':''}" data-enemy="${e.id}" style="touch-action:manipulation">
          <div class="flex-between">
            <span style="font-weight:500">${e.name}</span>
            <span class="badge badge-${locked?'danger':'job'}">HP${e.hp} ATK${e.atk}</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${locked?'名声'+e.reqFame+'が必要':'コイン+'+e.coin+(sel?' ← 戦闘中':'')}</div>
        </div>`;
      }).join('')}
      ${inBattle && enemy ? `
      <div class="battle-panel" style="margin-top:10px">
        <div class="flex-between" style="margin-bottom:4px"><span style="font-weight:500">${enemy.name}</span><span style="font-size:12px">${Math.max(0,G.battle.enemyHp)}/${enemy.hp}</span></div>
        <div class="bar-wrap bar-md"><div class="bar-fill bar-hp" style="width:${ehpPct}%"></div></div>
        <div class="flex-between" style="margin:8px 0 4px"><span>自分HP</span><span>${Math.floor(G.battle.hp)}/${G.battle.maxHp}</span></div>
        <div class="bar-wrap bar-md"><div class="bar-fill" style="background:var(--color-success);width:${hpPct}%"></div></div>
        <button id="atk-btn" class="btn btn-danger btn-full" style="margin-top:10px;min-height:44px;font-size:14px;font-weight:bold">⚔️ 攻撃！(ATK ${Stats.getAtk()})</button>
        <div class="log-panel" style="margin-top:8px;max-height:80px">${G.battle.battleLog.slice(0,5).map(l=>`<div class="log-item">${l}</div>`).join('')}</div>
      </div>` : '<div style="font-size:12px;color:var(--color-text-sub);margin-top:10px;text-align:center">上の敵をタップして戦闘開始</div>'}
    </div>`;
  },


  // ===== 装備タブ =====
  _tabEquipment() {
    const slots = [
      { key: 'weapon',    label: '武器',       icon: '⚔️' },
      { key: 'armor',     label: '防具',       icon: '🛡️' },
      { key: 'accessory1',label: 'アクセサリ1', icon: '💍' },
      { key: 'accessory2',label: 'アクセサリ2', icon: '💍' },
      { key: 'relic',     label: 'レリック',   icon: '🔮' },
    ];
    const allItems = [...WEAPON_DATA, ...ARMOR_DATA, ...ACCESSORY_DATA, ...ARTIFACT_DATA, ...RELIC_DATA];
    const ownedItems = G.equipment.owned.map(id => allItems.find(i => i.id === id)).filter(Boolean);

    const rarityColor = { common:'var(--color-text-sub)', uncommon:'#4ade80', rare:'#60a5fa', epic:'#c084fc', legend:'#fbbf24', myth:'#f97316', divine:'#f43f5e' };

    const slotsHtml = slots.map(s => {
      const eqId = G.equipment[s.key];
      const eq   = eqId ? allItems.find(i => i.id === eqId) : null;
      return `<div class="stat-row" style="align-items:center">
        <span class="stat-label">${s.icon} ${s.label}</span>
        <span class="stat-value" style="color:${eq ? (rarityColor[eq.rarity]||'#fff') : 'var(--color-text-sub)'}">
          ${eq ? eq.icon + ' ' + eq.name : '—'}
        </span>
        ${eq ? `<button class="btn btn-danger" style="font-size:10px;padding:2px 6px;margin-left:6px" data-unequip="${s.key}">外す</button>` : ''}
      </div>`;
    }).join('');

    const ownedHtml = ownedItems.length === 0
      ? '<div style="color:var(--color-text-sub);font-size:12px;text-align:center;padding:12px">所持装備なし</div>'
      : ownedItems.map(item => {
          const equipped = Object.values(G.equipment).includes(item.id);
          return `<div class="enemy-card${equipped?' fighting':''}" style="cursor:pointer" data-equip="${item.id}">
            <div class="flex-between">
              <span style="font-weight:500;color:${rarityColor[item.rarity]||'#fff'}">${item.icon} ${item.name}</span>
              <span class="badge badge-${equipped?'job':'skill'}" style="font-size:10px">${equipped?'装備中':item.slot}</span>
            </div>
            <div style="font-size:11px;color:var(--color-text-sub);margin-top:3px">
              ${item.atk?'ATK+'+item.atk+' ':''}${item.def?'DEF+'+item.def+' ':''}${item.hp?'HP+'+item.hp+' ':''}${item.mp?'MP+'+item.mp+' ':''}${item.xp?'XP+'+(item.xp*100).toFixed(0)+'% ':''}${item.coin?'コイン+'+(item.coin*100).toFixed(0)+'% ':''}${item.lifespan?'寿命+'+item.lifespan+'年 ':''}
            </div>
          </div>`;
        }).join('');

    return `<div class="panel">
      <div class="panel-title">🛡️ 装備スロット</div>
      ${slotsHtml}
      <div class="panel-title" style="margin-top:12px">🎒 所持装備（${ownedItems.length}件）</div>
      ${ownedHtml}
    </div>`;
  },

  // ===== クラフトタブ =====
  _tabCraft() {
    const list = CraftManager.getDisplayList();
    return `<div class="panel">
      <div class="panel-title">⚒️ クラフト</div>
      <div style="font-size:11px;color:var(--color-text-sub);margin-bottom:10px">
        素材: ${NumberUtil.format(G.resources.materials)} | コイン: ${NumberUtil.format(G.resources.coins)} | 総製作数: ${G.craft.totalCrafted}
      </div>
      ${list.map(r => `
        <div class="enemy-card" style="margin-bottom:6px">
          <div class="flex-between">
            <span style="font-weight:500">${r.icon} ${r.name}</span>
            <span class="badge badge-${r.canCraft?'job':'danger'}" style="font-size:10px">${r.canCraft?'作成可':'素材不足'}</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin:3px 0">${r.desc} | 所持:${r.owned}個</div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-bottom:6px">素材×${r.mat}${r.coin?` コイン×${r.coin}`:''}</div>
          <button class="btn btn-secondary" style="font-size:11px;min-height:36px" data-craft="${r.id}" ${r.canCraft?'':'disabled'}>⚒️ クラフト</button>
        </div>`).join('')}
    </div>`;
  },

  // ===== 所持品タブ =====
  _tabInventory() {
    const items = Object.entries(G.inventory.items).filter(([,count]) => count > 0);
    const allItems = [...WEAPON_DATA, ...ARMOR_DATA, ...ACCESSORY_DATA, ...ARTIFACT_DATA, ...RELIC_DATA];
    return `<div class="panel">
      <div class="panel-title">🎒 所持品（${items.length} / ${G.inventory.maxSlots}スロット）</div>
      ${items.length === 0
        ? '<div style="color:var(--color-text-sub);font-size:12px;text-align:center;padding:24px">所持品なし</div>'
        : items.map(([id, count]) => {
            const item = allItems.find(i => i.id === id);
            return `<div class="stat-row">
              <span class="stat-label">${item ? item.icon + ' ' + item.name : id}</span>
              <span class="stat-value">× ${count}</span>
            </div>`;
          }).join('')}
    </div>`;
  },

  // ===== ペットタブ =====
  _tabPets() {
    const list = PetManager.getDisplayList();
    const rarityColor = { common:'var(--color-text-sub)', uncommon:'#4ade80', rare:'#60a5fa', epic:'#c084fc', legend:'#fbbf24' };
    return `<div class="panel">
      <div class="panel-title">🐾 ペット（アクティブ: ${G.pets.active.length}/${CONSTANTS.PET_MAX_ACTIVE}）</div>
      ${list.map(p => {
        const lv   = G.pets.levels[p.id] || 1;
        const xp   = G.pets.xp[p.id] || 0;
        const xpReq = PetLevels.getXpRequired(p.id, lv);
        const xpPct = MathUtil.pct(xp, xpReq).toFixed(1);
        return `<div class="enemy-card${p.active?' fighting':''}${!p.owned?' locked':''}">
          <div class="flex-between">
            <span style="font-weight:500;color:${rarityColor[p.rarity]||'#fff'}">${p.icon} ${p.name}</span>
            <div class="flex" style="gap:4px;align-items:center">
              ${p.owned ? `<span class="lv-badge">Lv${lv}</span>` : ''}
              ${p.evolved ? '<span style="font-size:10px;color:#fbbf24">✨進化済</span>' : ''}
              <span class="badge badge-${p.active?'job':p.owned?'skill':'danger'}" style="font-size:9px">${p.active?'同行中':p.owned?'所持':'未入手'}</span>
            </div>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:3px">${p.desc}${!p.owned?' | 名声'+p.reqFame+(p.reqRebirth?' 転生'+p.reqRebirth+'回':'')+' 必要':''}</div>
          ${p.owned ? `
            <div class="mb" style="margin-top:4px">
              <div class="bw" style="flex:1;height:4px"><div class="bf bar-xp" style="width:${xpPct}%"></div></div>
              <span style="font-size:10px;color:var(--color-text-sub)">${xpPct}%</span>
            </div>
            <div class="flex" style="gap:4px;margin-top:4px">
              ${!p.active && G.pets.active.length < CONSTANTS.PET_MAX_ACTIVE ? `<button class="btn btn-secondary" style="font-size:10px;min-height:32px" data-pet-activate="${p.id}">同行させる</button>` : ''}
              ${p.active ? `<button class="btn btn-danger" style="font-size:10px;min-height:32px" data-pet-deactivate="${p.id}">外す</button>` : ''}
              ${PetEvolution.canEvolve(p.id) && !p.evolved ? `<button class="btn" style="font-size:10px;min-height:32px;background:linear-gradient(135deg,#fbbf24,#f97316);color:#000" data-pet-evolve="${p.id}">✨ 進化（素材100）</button>` : ''}
            </div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===== クエストタブ =====
  _tabQuests() {
    const main = QuestManager.getMainQuests();
    const side = QuestManager.getSideQuests();
    const completed = G.quests.completed.length;
    return `<div class="panel">
      <div class="panel-title">📜 メインクエスト</div>
      <div style="font-size:11px;color:var(--color-text-sub);margin-bottom:8px">達成済み: ${completed}件</div>
      ${main.map(q => `
        <div class="enemy-card${q.completed?' fighting':''}">
          <div class="flex-between">
            <span style="font-weight:500${q.completed?';color:var(--color-success)':''}">${q.completed?'✅ ':''} ${q.name}</span>
            <span style="font-size:10px;color:var(--color-text-sub)">第${q.chapter}章</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${q.desc}</div>
          <div style="font-size:10px;color:#fbbf24;margin-top:2px">報酬: ${q.reward.coin?'コイン×'+q.reward.coin+' ':''}${q.reward.mat?'素材×'+q.reward.mat+' ':''}${q.reward.soulFragments?'魂の欠片×'+q.reward.soulFragments:''}</div>
        </div>`).join('')}
      <div class="panel-title" style="margin-top:12px">📋 サイドクエスト</div>
      ${side.map(q => `
        <div class="enemy-card${q.completed?' fighting':''}">
          <div class="flex-between">
            <span style="font-weight:500${q.completed?';color:var(--color-success)':''}">${q.completed?'✅ ':''} ${q.name}</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${q.desc}</div>
          <div style="font-size:10px;color:#fbbf24;margin-top:2px">報酬: ${q.reward.coin?'コイン×'+q.reward.coin+' ':''}${q.reward.mat?'素材×'+q.reward.mat:''}</div>
        </div>`).join('')}
    </div>`;
  },

  // ===== 実績タブ =====
  _tabAchievements() {
    const all   = AchievementManager.getAll();
    const done  = all.filter(a => a.unlocked);
    const total = AchievementManager.getTotalPoints();
    const rarityColor = { common:'var(--color-text-sub)', uncommon:'#4ade80', rare:'#60a5fa', epic:'#c084fc', legend:'#fbbf24', divine:'#f43f5e' };

    return `<div class="panel">
      <div class="panel-title">🏆 実績（${done.length} / ${all.length}件 | ${total}ポイント）</div>
      <div class="lead-panel" style="margin-bottom:10px">解除済みは上部に表示されます。</div>
      ${[...done, ...all.filter(a=>!a.unlocked)].map(a => `
        <div class="stat-row" style="opacity:${a.unlocked?1:0.45}">
          <span style="font-size:16px;margin-right:6px">${a.icon}</span>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600;color:${rarityColor[a.rarity]||'#fff'}">${a.unlocked?'✅ ':''} ${a.name}</div>
            <div style="font-size:10px;color:var(--color-text-sub)">${a.desc}${a.title?' | 称号:「'+a.title+'」':''}</div>
          </div>
          <span style="font-size:11px;color:#fbbf24;white-space:nowrap">${a.points||0}pt</span>
        </div>`).join('')}
    </div>`;
  },

  // ===== 称号タブ =====
  _tabTitles() {
    const unlocked = G.titles.unlocked;
    const equipped = G.titles.equipped;
    return `<div class="panel">
      <div class="panel-title">👑 称号（${unlocked.length}個解放済み）</div>
      ${unlocked.length === 0
        ? '<div style="color:var(--color-text-sub);font-size:12px;text-align:center;padding:24px">まだ称号なし。実績を解除して獲得しよう！</div>'
        : unlocked.map(t => `
          <div class="enemy-card${t===equipped?' fighting':''}" data-equip-title="${t}" style="cursor:pointer">
            <div class="flex-between">
              <span style="font-weight:600;color:#fbbf24">「${t}」</span>
              <span class="badge badge-${t===equipped?'job':'skill'}" style="font-size:10px">${t===equipped?'装備中':'タップで装備'}</span>
            </div>
          </div>`).join('')}
      <div class="panel-title" style="margin-top:12px">現在の称号</div>
      <div class="lead-panel">${equipped ? '「'+equipped+'」' : '（なし）'}</div>
    </div>`;
  },

  // ===== 図鑑タブ =====
  _tabCollection() {
    const col = G.collection;
    const sections = [
      { label: '⚔️ 職業', items: col.jobs,    total: JOB_DATA.length },
      { label: '📖 スキル', items: col.skills,  total: SKILL_DATA.length },
      { label: '🗡️ 敵',   items: col.enemies,  total: ENEMY_DATA.length },
      { label: '🎒 アイテム', items: col.items, total: [...WEAPON_DATA,...ARMOR_DATA,...ACCESSORY_DATA,...ARTIFACT_DATA,...RELIC_DATA].length },
      { label: '🗺️ 地域', items: col.regions,  total: EXPLORE_DATA.length },
      { label: '👑 称号',  items: col.titles,   total: G.titles.unlocked.length },
    ];
    return `<div class="panel">
      <div class="panel-title">📚 図鑑</div>
      ${sections.map(s => {
        const pct = s.total > 0 ? MathUtil.pct(s.items.length, s.total).toFixed(0) : 0;
        return `<div class="stat-row" style="flex-direction:column;align-items:stretch;margin-bottom:8px">
          <div class="flex-between" style="margin-bottom:3px">
            <span class="stat-label">${s.label}</span>
            <span class="stat-value">${s.items.length} / ${s.total}</span>
          </div>
          <div class="bar-wrap bar-sm"><div class="bar-fill bar-xp" style="width:${pct}%"></div></div>
        </div>`;
      }).join('')}
      <div class="panel-title" style="margin-top:12px">🗡️ 討伐記録</div>
      ${ENEMY_DATA.map(e => {
        const kills = G.battle.killsByEnemy?.[e.id] || 0;
        return `<div class="stat-row">
          <span class="stat-label">${e.name}</span>
          <span class="stat-value">${kills > 0 ? kills+'体討伐' : '未討伐'}</span>
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===== 覚醒タブ（Tier2） =====
  _tabAwakening() {
    const unlocked = G.rebirth.count >= 5;
    if (!unlocked) return `<div class="panel">
      <div class="panel-title">⭐ 覚醒</div>
      <div class="lead-panel">5回転生すると解放されます（現在: ${G.rebirth.count}回）</div>
    </div>`;

    const crystals = G.resources.awakeningCrystals || 0;
    const CONST_NODES = [
      { id: 'c_xp',    name: 'XP星座',   icon: '📖', bonus: 'XP+20%',      cost: 50 },
      { id: 'c_coin',  name: 'コイン星座',icon: '💰', bonus: 'コイン+20%',  cost: 50 },
      { id: 'c_atk',   name: '戦力星座', icon: '⚔️', bonus: 'ATK+20',      cost: 80 },
      { id: 'c_hp',    name: '生命星座',  icon: '❤️', bonus: 'HP+200',      cost: 80 },
      { id: 'c_life',  name: '長命星座',  icon: '🌿', bonus: '寿命+10年',   cost: 120 },
      { id: 'c_soul',  name: '魂星座',   icon: '🔮', bonus: '魂の欠片+50%', cost: 150 },
    ];
    return `<div class="panel">
      <div class="panel-title">⭐ 覚醒システム</div>
      <div style="font-size:11px;color:var(--color-text-sub);margin-bottom:10px">覚醒結晶: <span style="color:#c084fc;font-weight:600">${NumberUtil.format(crystals)}</span></div>
      <div class="lead-panel" style="margin-bottom:10px">転生を重ねるごとに覚醒結晶を獲得できます。星座を強化して永続ボーナスを得ましょう。</div>
      ${CONST_NODES.map(n => {
        const lv = (G.awakening.constellations[n.id] || 0);
        const owned = G.awakening.unlocked.includes(n.id);
        const canBuy = crystals >= n.cost && !owned;
        return `<div class="enemy-card${owned?' fighting':''}">
          <div class="flex-between">
            <span style="font-weight:500">${n.icon} ${n.name}</span>
            <span class="badge badge-${owned?'job':'skill'}">${owned?'解放済み':'未解放'}</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${n.bonus}</div>
          ${!owned ? `<button class="btn btn-secondary" style="font-size:11px;min-height:32px;margin-top:6px" data-awakening="${n.id}" data-cost="${n.cost}" ${canBuy?'':'disabled'}>解放（結晶×${n.cost}）</button>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===== 超越タブ（Tier3） =====
  _tabTranscendence() {
    const unlocked = G.rebirth.count >= 15;
    if (!unlocked) return `<div class="panel">
      <div class="panel-title">🌌 超越</div>
      <div class="lead-panel">15回転生すると解放されます（現在: ${G.rebirth.count}回）</div>
    </div>`;

    const essence = G.resources.transcendenceEssence || 0;
    const RUNE_DATA = [
      { id: 'r_power',  name: '力のルーン',  icon: '💪', bonus: '全ATK×2',      cost: 100 },
      { id: 'r_wisdom', name: '知のルーン',  icon: '🧠', bonus: '全XP×2',       cost: 100 },
      { id: 'r_time',   name: '時のルーン',  icon: '⏳', bonus: '寿命×1.5',     cost: 150 },
      { id: 'r_wealth', name: '富のルーン',  icon: '💎', bonus: '全コイン×2',   cost: 150 },
      { id: 'r_soul',   name: '魂のルーン',  icon: '🔮', bonus: '魂の欠片×3',   cost: 200 },
    ];
    return `<div class="panel">
      <div class="panel-title">🌌 超越システム</div>
      <div style="font-size:11px;color:var(--color-text-sub);margin-bottom:10px">超越エッセンス: <span style="color:#60a5fa;font-weight:600">${NumberUtil.format(essence)}</span></div>
      <div class="lead-panel" style="margin-bottom:10px">さらなる高みへ。ルーンを刻み、根本的な強化を手に入れましょう。</div>
      ${RUNE_DATA.map(r => {
        const owned = G.transcendence.runes[r.id];
        const canBuy = essence >= r.cost && !owned;
        return `<div class="enemy-card${owned?' fighting':''}">
          <div class="flex-between">
            <span style="font-weight:500">${r.icon} ${r.name}</span>
            <span class="badge badge-${owned?'job':'skill'}">${owned?'刻印済み':'未刻印'}</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${r.bonus}</div>
          ${!owned ? `<button class="btn btn-secondary" style="font-size:11px;min-height:32px;margin-top:6px" data-rune="${r.id}" data-cost="${r.cost}" ${canBuy?'':'disabled'}>刻印（エッセンス×${r.cost}）</button>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===== 神格化タブ（Tier4） =====
  _tabDivinity() {
    const unlocked = G.rebirth.count >= 50;
    if (!unlocked) return `<div class="panel">
      <div class="panel-title">✨ 神格化</div>
      <div class="lead-panel">50回転生すると解放されます（現在: ${G.rebirth.count}回）</div>
    </div>`;

    const div = G.divinity;
    const power = G.resources.divinePower || 0;
    const DIVINE_CLASSES = [
      { id: 'war_god',    name: '戦神',   icon: '⚔️', bonus: 'ATK×5 クリット率+20%' },
      { id: 'life_god',   name: '生命神', icon: '🌿', bonus: 'HP×5 寿命+50年' },
      { id: 'wisdom_god', name: '知恵神', icon: '🧠', bonus: 'XP×10 スキルXP×5' },
      { id: 'wealth_god', name: '富神',   icon: '💰', bonus: 'コイン×10 素材×5' },
    ];
    return `<div class="panel">
      <div class="panel-title">✨ 神格化</div>
      <div style="font-size:11px;color:var(--color-text-sub);margin-bottom:10px">神力: <span style="color:#f43f5e;font-weight:600">${NumberUtil.format(power)}</span> | 信者: ${NumberUtil.format(div.faithers||0)}人 | 神格Lv: ${div.level||0}</div>
      <div class="panel-title" style="margin-top:8px">神格クラス</div>
      ${div.godClass ? `<div class="lead-panel">現在の神格: <strong>${DIVINE_CLASSES.find(c=>c.id===div.godClass)?.icon} ${DIVINE_CLASSES.find(c=>c.id===div.godClass)?.name}</strong></div>` : ''}
      ${DIVINE_CLASSES.map(c => {
        const active = div.godClass === c.id;
        return `<div class="enemy-card${active?' fighting':''}" data-divine-class="${c.id}" style="cursor:pointer">
          <div class="flex-between">
            <span style="font-weight:500">${c.icon} ${c.name}</span>
            <span class="badge badge-${active?'job':'skill'}">${active?'選択中':'選択'}</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${c.bonus}</div>
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===== 宇宙創造タブ（Tier5+） =====
  _tabUniverse() {
    const unlocked = G.rebirth.count >= 100;
    if (!unlocked) return `<div class="panel">
      <div class="panel-title">🌍 宇宙創造</div>
      <div class="lead-panel">100回転生すると解放されます（現在: ${G.rebirth.count}回）</div>
    </div>`;

    const cp = G.resources.creationPower || 0;
    const created = G.universe.created || 0;
    const LAWS = [
      { id: 'law_time',    name: '時間の法則',    icon: '⏰', bonus: 'ゲーム速度+1段階', cost: 1000 },
      { id: 'law_life',    name: '生命の法則',    icon: '🌿', bonus: '全HP×10',          cost: 2000 },
      { id: 'law_soul',    name: '魂の法則',      icon: '🔮', bonus: '魂の欠片×100',     cost: 5000 },
      { id: 'law_reality', name: '現実の法則',    icon: '🌌', bonus: '全ステータス×2',   cost: 10000 },
    ];
    return `<div class="panel">
      <div class="panel-title">🌍 宇宙創造システム</div>
      <div style="font-size:11px;color:var(--color-text-sub);margin-bottom:10px">創造力: <span style="color:#22d3ee;font-weight:600">${NumberUtil.format(cp)}</span> | 創造した宇宙: ${created}個</div>
      <div class="lead-panel" style="margin-bottom:10px">宇宙の法則を定め、存在そのものを超越しましょう。</div>
      ${LAWS.map(l => {
        const enacted = G.universe.laws[l.id];
        const canBuy  = cp >= l.cost && !enacted;
        return `<div class="enemy-card${enacted?' fighting':''}">
          <div class="flex-between">
            <span style="font-weight:500">${l.icon} ${l.name}</span>
            <span class="badge badge-${enacted?'job':'skill'}">${enacted?'制定済み':'未制定'}</span>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${l.bonus}</div>
          ${!enacted ? `<button class="btn btn-secondary" style="font-size:11px;min-height:32px;margin-top:6px" data-law="${l.id}" data-cost="${l.cost}" ${canBuy?'':'disabled'}>制定（創造力×${l.cost}）</button>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===== 自動化タブ =====
  _tabAutomation() {
    const autos = [
      { key: 'explore',       label: '自動探索',          icon: '🗺️', desc: 'エリアを自動で探索し続ける' },
      { key: 'craft',         label: '自動クラフト',       icon: '⚒️', desc: 'レシピを自動でクラフトし続ける' },
      { key: 'equip',         label: '自動装備',           icon: '🛡️', desc: '強い装備を自動で装備する' },
      { key: 'job',           label: '自動職業変更',       icon: '⚔️', desc: '条件を満たした職業に自動転職' },
      { key: 'rebirth',       label: '自動転生',           icon: '🔄', desc: '寿命終了時に自動で転生する', reqRebirth: 3 },
      { key: 'awakening',     label: '自動覚醒',           icon: '⭐', desc: '覚醒結晶を自動で使用する',    reqRebirth: 10 },
      { key: 'transcendence', label: '自動超越',           icon: '🌌', desc: 'エッセンスを自動で使用する',   reqRebirth: 20 },
      { key: 'everything',    label: '全自動モード',       icon: '🤖', desc: 'すべてを自動化する（神の視点）', reqRebirth: 50 },
    ];
    return `<div class="panel">
      <div class="panel-title">⚙️ 自動化設定</div>
      <div class="lead-panel" style="margin-bottom:10px">転生を重ねると自動化オプションが解放されます。</div>
      ${autos.map(a => {
        const req = a.reqRebirth || 0;
        const available = G.rebirth.count >= req;
        const active = G.automation[a.key];
        return `<div class="enemy-card${active?' fighting':''}${!available?' locked':''}">
          <div class="flex-between">
            <span style="font-weight:500">${a.icon} ${a.label}</span>
            <label class="flex" style="align-items:center;gap:6px;cursor:${available?'pointer':'not-allowed'}">
              <input type="checkbox" ${active?'checked':''} ${!available?'disabled':''} data-auto="${a.key}" style="width:16px;height:16px;accent-color:var(--color-accent)">
              <span class="badge badge-${active?'job':available?'skill':'danger'}" style="font-size:10px">${active?'ON':available?'OFF':'転生'+req+'回'}</span>
            </label>
          </div>
          <div style="font-size:11px;color:var(--color-text-sub);margin-top:2px">${a.desc}</div>
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===== 転生タブ =====
  _tabRebirth() {
    const maxLv   = Math.max(...Object.values(G.jobs.levels));
    const frags   = MathUtil.calcSoulFragments(G);
    const bonus   = MathUtil.calcRebirthBonus(G.rebirth.count + 1);
    return `
    <div class="panel">
      <div class="panel-title">🔄 転生</div>
      <div class="lead-panel">寿命が尽きると転生できます。転生するごとにXPボーナスが増加し、魂の欠片を獲得します。</div>
      <div class="stat-row"><span class="stat-label">転生回数</span><span class="stat-value">${G.rebirth.count}回</span></div>
      <div class="stat-row"><span class="stat-label">現在のXPボーナス</span><span class="stat-value">${NumberUtil.mult(G.rebirth.bonusXp||1)}</span></div>
      <div class="stat-row"><span class="stat-label">最高職業Lv</span><span class="stat-value">${maxLv}</span></div>
      <div class="stat-row"><span class="stat-label">獲得する魂の欠片</span><span class="stat-value" style="color:var(--color-soul)">${frags}</span></div>
      <div class="stat-row"><span class="stat-label">次の転生ボーナス</span><span class="stat-value">${NumberUtil.mult(bonus)}</span></div>
      <button id="rebirth-btn" class="rbtn${G.time.isDead?' rdy':''}" style="margin-top:12px;min-height:44px" ${G.time.isDead?'':'disabled'}>
        ${G.time.isDead ? '✨ 転生する！' : '転生する（寿命が尽きると解放）'}
      </button>
    </div>`;
  },

  // ===== 設定タブ =====
  _tabSettings() {
    return `
    <div class="panel">
      <div class="panel-title">🔧 設定・データ</div>
      <div class="btn-group" style="margin-bottom:12px">
        <button id="save-btn"   class="btn btn-secondary">💾 セーブ</button>
        <button id="export-btn" class="btn">📤 エクスポート</button>
        <button id="import-btn" class="btn">📥 インポート</button>
        <button id="reset-btn"  class="btn btn-danger">🗑️ リセット</button>
      </div>
      <div class="stat-row"><span class="stat-label">バージョン</span><span class="stat-value">${CONSTANTS.VERSION}</span></div>
      <div class="stat-row"><span class="stat-label">総プレイ時間</span><span class="stat-value">${NumberUtil.format(G.meta.playTime)} tick</span></div>
      <div class="stat-row"><span class="stat-label">最終セーブ</span><span class="stat-value">${G.meta.lastSaved ? new Date(G.meta.lastSaved).toLocaleString('ja-JP') : 'なし'}</span></div>
      <div class="stat-row"><span class="stat-label">転生回数</span><span class="stat-value">${G.rebirth.count}</span></div>
    </div>`;
  },

  // ===== タブ内イベントバインド =====
  _bindTabEvents(name) {
    // 職業選択
    document.querySelectorAll('[data-job]').forEach(el => {
      let t = false;
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; JobManager.select(el.dataset.job); this.render(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) { JobManager.select(el.dataset.job); this.render(); } t=false; });
    });
    // スキル選択
    document.querySelectorAll('[data-skill]').forEach(el => {
      let t = false;
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; SkillManager.select(el.dataset.skill); this.render(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) { SkillManager.select(el.dataset.skill); this.render(); } t=false; });
    });
    // 探索
    document.querySelectorAll('[data-explore]').forEach(el => {
      let t = false;
      const go = () => {
        const id = el.dataset.explore;
        const a  = EXPLORE_DATA.find(a => a.id === id);
        if (!a || G.resources.fame < a.reqFame || G.explore.current === id) return;
        G.explore.current  = id;
        G.explore.progress = 0;
        Notification.log(a.name + 'へ出発！');
        this.render();
      };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 敵選択
    document.querySelectorAll('[data-enemy]').forEach(el => {
      let t = false;
      const go = () => { CombatManager.startBattle(el.dataset.enemy); this.render(); };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 攻撃ボタン
    const atkBtn = document.getElementById('atk-btn');
    if (atkBtn) {
      let t = false;
      atkBtn.addEventListener('touchstart', e => { e.preventDefault(); t = true; CombatManager.attack(); }, { passive: false });
      atkBtn.addEventListener('click', () => { if(!t) CombatManager.attack(); t=false; });
    }
    // 転生ボタン
    const rbBtn = document.getElementById('rebirth-btn');
    if (rbBtn) {
      let t = false;
      const doRebirth = () => {
        if (!G.time.isDead) return;
        const frags = MathUtil.calcSoulFragments(G);
        const bonus = MathUtil.calcRebirthBonus(G.rebirth.count + 1);
        G.resources.soulFragments += frags;
        G.rebirth.bonusXp = bonus;
        G.rebirth.count++;
        G.time.day = 0; G.time.age = CONSTANTS.START_AGE;
        G.time.isDead = false;
        G.resources.coins = 0; G.resources.fame = 0; G.resources.materials = 0;
        G.battle.hp = Stats.getMaxHp(); G.battle.mp = Stats.getMaxMp();
        JobManager.resetOnRebirth();
        SkillManager.resetOnRebirth();
        G.explore.current = null; G.explore.progress = 0;
        const badge = document.getElementById('rebirth-badge');
        if (badge) badge.classList.add('hidden');
        Notification.show('転生 ' + G.rebirth.count + '回目！', 'XPボーナス: ' + NumberUtil.mult(bonus), 'accent');
        EventBus.emit(GAME_EVENTS.REBIRTH, { count: G.rebirth.count, bonus });
        this.render();
      };
      rbBtn.addEventListener('touchstart', e => { e.preventDefault(); t = true; doRebirth(); }, { passive: false });
      rbBtn.addEventListener('click', () => { if(!t) doRebirth(); t=false; });
    }
    // 設定ボタン
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
      let t = false;
      const go = () => { SaveManager.save(); Notification.show('セーブしました', '', 'info'); };
      saveBtn.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      saveBtn.addEventListener('click', () => { if(!t) go(); t=false; });
    }
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
      let t = false;
      const go = async () => { await ExportSave.copyToClipboard(); Notification.show('クリップボードにコピーしました', '', 'info'); };
      exportBtn.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      exportBtn.addEventListener('click', () => { if(!t) go(); t=false; });
    }
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      let t = false;
      const go = () => {
        if (!confirm('本当にリセットしますか？')) return;
        SaveManager.deleteSave();
        location.reload();
      };
      resetBtn.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      resetBtn.addEventListener('click', () => { if(!t) go(); t=false; });
    }

    // ===== 新タブのイベントバインド =====
    // 装備：装備ボタン
    document.querySelectorAll('[data-equip]').forEach(el => {
      let t = false;
      const go = () => {
        const item = EquipmentManager.getById(el.dataset.equip);
        if (!item) return;
        const slot = item.slot === 'accessory' ? (G.equipment.accessory1 ? 'accessory2' : 'accessory1') : item.slot;
        EquipmentManager.equip(item.id, slot);
        this.render();
      };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 装備：外すボタン
    document.querySelectorAll('[data-unequip]').forEach(el => {
      let t = false;
      const go = () => { EquipmentManager.unequip(el.dataset.unequip); this.render(); };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // クラフト
    document.querySelectorAll('[data-craft]').forEach(el => {
      let t = false;
      const go = () => { CraftManager.craft(el.dataset.craft); this.render(); };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // ペット：同行
    document.querySelectorAll('[data-pet-activate]').forEach(el => {
      let t = false;
      const go = () => { PetManager.activate(el.dataset.petActivate); this.render(); };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // ペット：外す
    document.querySelectorAll('[data-pet-deactivate]').forEach(el => {
      let t = false;
      const go = () => { PetManager.deactivate(el.dataset.petDeactivate); this.render(); };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // ペット：進化
    document.querySelectorAll('[data-pet-evolve]').forEach(el => {
      let t = false;
      const go = () => { PetEvolution.evolve(el.dataset.petEvolve); this.render(); };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 称号装備
    document.querySelectorAll('[data-equip-title]').forEach(el => {
      let t = false;
      const go = () => { TitleManager.equip(el.dataset.equipTitle); this.render(); };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 覚醒：星座解放
    document.querySelectorAll('[data-awakening]').forEach(el => {
      let t = false;
      const go = () => {
        const cost = parseInt(el.dataset.cost);
        if ((G.resources.awakeningCrystals||0) < cost) return;
        G.resources.awakeningCrystals -= cost;
        if (!G.awakening.unlocked.includes(el.dataset.awakening)) G.awakening.unlocked.push(el.dataset.awakening);
        Notification.log('星座「'+el.dataset.awakening+'」を解放！');
        this.render();
      };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 超越：ルーン刻印
    document.querySelectorAll('[data-rune]').forEach(el => {
      let t = false;
      const go = () => {
        const cost = parseInt(el.dataset.cost);
        if ((G.resources.transcendenceEssence||0) < cost) return;
        G.resources.transcendenceEssence -= cost;
        G.transcendence.runes[el.dataset.rune] = true;
        Notification.log('ルーン「'+el.dataset.rune+'」を刻印！');
        this.render();
      };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 神格クラス選択
    document.querySelectorAll('[data-divine-class]').forEach(el => {
      let t = false;
      const go = () => { G.divinity.godClass = el.dataset.divineClass; Notification.log('神格クラスを変更！'); this.render(); };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 宇宙の法則制定
    document.querySelectorAll('[data-law]').forEach(el => {
      let t = false;
      const go = () => {
        const cost = parseInt(el.dataset.cost);
        if ((G.resources.creationPower||0) < cost) return;
        G.resources.creationPower -= cost;
        G.universe.laws[el.dataset.law] = true;
        Notification.log('法則「'+el.dataset.law+'」を制定！');
        this.render();
      };
      el.addEventListener('touchstart', e => { e.preventDefault(); t = true; go(); }, { passive: false });
      el.addEventListener('click', () => { if(!t) go(); t=false; });
    });
    // 自動化チェックボックス
    document.querySelectorAll('[data-auto]').forEach(el => {
      el.addEventListener('change', () => {
        G.automation[el.dataset.auto] = el.checked;
        this.render();
      });
    });

  },
};

// GameLoop は js/core/gameloop.js で定義されています
