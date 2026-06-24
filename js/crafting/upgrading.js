/* js/crafting/upgrading.js */
const Upgrading = {
  upgrade(itemId) {
    const item = EquipmentManager.getById(itemId);
    if (!item) return false;
    const cost = { mat: 20, coin: 100 };
    if (!Resources.spendMaterials(cost.mat)) return false;
    if (!Resources.spendCoins(cost.coin))    return false;
    if (!G.equipment.upgrades) G.equipment.upgrades = {};
    G.equipment.upgrades[itemId] = (G.equipment.upgrades[itemId] || 0) + 1;
    Notification.log(item.name + 'を強化！(Lv' + G.equipment.upgrades[itemId] + ')');
    Stats.update();
    return true;
  },
};
