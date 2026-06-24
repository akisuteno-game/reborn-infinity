/* js/crafting/refining.js */
const Refining = {
  refine(itemId, times = 1) {
    const item = EquipmentManager.getById(itemId);
    if (!item || !G.equipment.owned.includes(itemId)) return false;
    const cost = 10 * times;
    if (!Resources.spendMaterials(cost)) return false;
    if (!G.equipment.refined) G.equipment.refined = {};
    G.equipment.refined[itemId] = (G.equipment.refined[itemId] || 0) + times;
    Notification.log(item.name + 'を精錬！(+' + G.equipment.refined[itemId] + ')');
    Stats.update();
    return true;
  },
  getBonus(itemId, stat) {
    if (!G.equipment.refined?.[itemId]) return 0;
    const item = EquipmentManager.getById(itemId);
    if (!item || !item[stat]) return 0;
    return item[stat] * G.equipment.refined[itemId] * 0.1;
  },
};
