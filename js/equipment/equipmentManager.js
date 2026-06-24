/* js/equipment/equipmentManager.js */
const EquipmentManager = {
  getAllItems() {
    return [...WEAPON_DATA, ...ARMOR_DATA, ...ACCESSORY_DATA, ...ARTIFACT_DATA, ...RELIC_DATA, ...CREATOR_GEAR_DATA];
  },
  getById(id) { return this.getAllItems().find(i => i.id === id); },
  tick(G) {},
  getStatBonus(stat) {
    let val = 0;
    ['weapon','armor','accessory1','accessory2','relic'].forEach(slot => {
      const id = G.equipment[slot];
      if (!id) return;
      const item = this.getById(id);
      if (item && item[stat]) val += item[stat];
    });
    return val;
  },
  getStatMult(stat) {
    let mult = 1;
    ['weapon','armor','accessory1','accessory2','relic'].forEach(slot => {
      const id = G.equipment[slot];
      if (!id) return;
      const item = this.getById(id);
      if (item && item[stat] && item[stat] < 5) mult += item[stat];
    });
    return mult;
  },
  equip(itemId, slot) {
    const item = this.getById(itemId);
    if (!item) return false;
    if (!G.equipment.owned.includes(itemId)) return false;
    G.equipment[slot || item.slot] = itemId;
    Notification.log(item.name + 'を装備！');
    Stats.update();
    return true;
  },
  unequip(slot) {
    G.equipment[slot] = null;
    Stats.update();
  },
  canCraft(itemId) {
    const item = this.getById(itemId);
    if (!item) return false;
    if (item.reqFame    && G.resources.fame   < item.reqFame)    return false;
    if (item.reqRebirth && G.rebirth.count    < item.reqRebirth) return false;
    if (item.reqTier    && G.tier             < item.reqTier)    return false;
    if (item.mat        && G.resources.materials < item.mat)     return false;
    if (item.coin       && G.resources.coins     < item.coin)    return false;
    return true;
  },
  craft(itemId) {
    if (!this.canCraft(itemId)) return false;
    const item = this.getById(itemId);
    G.resources.materials -= (item.mat  || 0);
    G.resources.coins     -= (item.coin || 0);
    G.equipment.owned.push(itemId);
    G.inventory.items[itemId] = (G.inventory.items[itemId] || 0) + 1;
    Notification.log(item.name + 'をクラフト！');
    return true;
  },
};
