/* ============================================
   Reborn Infinity - js/skills/skillSynergy.js
   スキルシナジー（複数スキルの組み合わせボーナス）
   ============================================ */

const SkillSynergy = {

  // シナジー定義
  _synergies: [
    {
      id: 'warrior_synergy',
      name: '戦士の魂',
      skills: ['sword_mastery', 'shield_mastery', 'strength'],
      minLevel: 10,
      bonus: { atk: 10, def: 5, hp: 50 },
      desc: '剣・盾・体力が全てLv10以上でATK+10・DEF+5・HP+50',
    },
    {
      id: 'mage_synergy',
      name: '魔法の覚醒',
      skills: ['fire_magic', 'ice_magic', 'mana_pool'],
      minLevel: 10,
      bonus: { magicDmg: 0.20, mp: 50 },
      desc: '火・氷・マナが全てLv10以上で魔法ダメージ+20%・MP+50',
    },
    {
      id: 'explorer_synergy',
      name: '探求者の本能',
      skills: ['gathering', 'luck', 'agility'],
      minLevel: 15,
      bonus: { mat: 0.25, explore: 0.20, luck: 0.10 },
      desc: '採集・幸運・敏捷がLv15以上で素材+25%・探索+20%',
    },
    {
      id: 'merchant_synergy',
      name: '商才の極み',
      skills: ['wisdom', 'charisma', 'negotiation'],
      minLevel: 20,
      bonus: { coin: 0.40, fame: 0.25 },
      desc: '知恵・カリスマ・交渉術がLv20以上でコイン+40%・名声+25%',
    },
    {
      id: 'craftmaster_synergy',
      name: '神の職人技',
      skills: ['crafting', 'smithing', 'alchemy', 'enchanting'],
      minLevel: 20,
      bonus: { craft: 0.50, mat: 0.20 },
      desc: 'クラフト・鍛冶・錬金・付与がLv20以上でクラフト+50%',
    },
    {
      id: 'divine_synergy',
      name: '神格の目覚め',
      skills: ['divine_protection', 'soul_power', 'divine_wisdom'],
      minLevel: 15,
      bonus: { xp: 0.30, hp: 100, lifespan: 10 },
      desc: '神の加護・魂の力・神の叡智がLv15以上でXP+30%',
    },
  ],

  // アクティブなシナジーを取得
  getActive() {
    return this._synergies.filter(syn => {
      return syn.skills.every(skillId => {
        return (G.skills.levels[skillId] || 0) >= syn.minLevel;
      });
    });
  },

  // 特定ステータスのシナジーボーナス合計
  getBonus(stat) {
    return this.getActive().reduce((sum, syn) => {
      return sum + (syn.bonus[stat] || 0);
    }, 0);
  },

};
