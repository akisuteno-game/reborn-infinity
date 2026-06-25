/* ============================================
   Reborn Infinity - js/ui.js
   UI・通知・ステータス・ゲームループ 統合ファイル
   （個別ファイル実装までの暫定版）
   ============================================ */

// ===== 未実装モジュールのスタブ =====

const SoulTree = {
  getBonus(stat) { return 0; },
};

const EquipmentManager = {
  getStatBonus(stat) { return 0; },
  getStatMult(stat)  { return 1; },
  tick(G) {},
};

const PetManager = {
  getStatBonus(stat) { return 0; },
  tick(G) {},
};

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
      Notification.log(`${area.name}から帰還！素材+${mat} コイン+${coin}`);
      G.explore.current  = null;
      G.explore.progress = 0;
    }
  },
};

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
    G.resources.coins += enemy.coin;
    G.resources.fame  += enemy.coin * 0.5;
    Notification.log(enemy.name + 'を討伐！コイン+' + enemy.coin);
    G.battle.inBattle = false;
    G.battle.enemy    = null;
    EventBus.emit(GAME_EVENTS.BATTLE_WIN, { enemyId: enemy.id });
    UIManager.render();
  },
};

const AchievementManager = {
  check(G) {},
};

const QuestManager = {
  tick(G) {},
};

const EventManager = {
  tick(G) {},
};

const AutomationSystem = {
  tick(G) {},
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
      case 'status':  return this._tabStatus();
      case 'jobs':    return this._tabJobs();
      case 'skills':  return this._tabSkills();
      case 'explore': return this._tabExplore();
      case 'combat':  return this._tabCombat();
      case 'rebirth': return this._tabRebirth();
      case 'settings':return this._tabSettings();
      default:        return `<div class="empty-state"><div class="empty-state-icon">🚧</div><div class="empty-state-text">準備中...</div></div>`;
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
  },
};

// GameLoop は js/core/gameloop.js で定義されています
