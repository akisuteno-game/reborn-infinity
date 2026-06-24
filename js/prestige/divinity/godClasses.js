const GOD_CLASSES = [
  { id:'creator_god', name:'創造神', desc:'万物を創造する力', bonus:{ coin:5.0, mat:3.0 } },
  { id:'war_god',     name:'戦神',   desc:'戦いの神',        bonus:{ atk:500, critRate:0.30 } },
  { id:'wisdom_god',  name:'知識神', desc:'知恵の神',        bonus:{ xp:5.0, skillXp:3.0 } },
  { id:'fate_god',    name:'運命神', desc:'運命を操る神',    bonus:{ luck:1.0, lifespan:50 } },
];
Object.freeze(GOD_CLASSES);
const GodClasses = {
  select(id){ G.divinity.godClass=id; Notification.log('神格クラス選択: '+GOD_CLASSES.find(g=>g.id===id)?.name); Stats.update(); },
  getBonus(stat){ const gc=GOD_CLASSES.find(g=>g.id===G.divinity?.godClass); return gc?.bonus[stat]||0; },
};
