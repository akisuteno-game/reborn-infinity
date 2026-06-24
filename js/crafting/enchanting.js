/* js/crafting/enchanting.js */
const Enchanting = {
  _enchants: [
    { id: 'fire',      name: '炎の付与',  cost: 30, bonus: { fireDmg: 10 }   },
    { id: 'ice',       name: '氷の付与',  cost: 30, bonus: { iceDmg: 10 }    },
    { id: 'holy',      name: '聖の付与',  cost: 50, bonus: { atk: 10, hp: 50 } },
    { id: 'speed',     name: '迅速の付与',cost: 40, bonus: { xp: 0.10 }      },
  ],
  enchant(itemId, enchantId) {
    const ench = this._enchants.find(e => e.id === enchantId);
    if (!ench || !Resources.spendMaterials(ench.cost)) return false;
    if (!G.equipment.enchants) G.equipment.enchants = {};
    G.equipment.enchants[itemId] = enchantId;
    Notification.log('付与魔法: ' + ench.name + 'を' + itemId + 'に付与！');
    Stats.update();
    return true;
  },
  getAll() { return this._enchants; },
};
