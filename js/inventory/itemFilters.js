/* js/inventory/itemFilters.js */
const ItemFilters = {
  byRarity(rarity) {
    return Object.keys(G.inventory.items).filter(id => {
      const item = EquipmentManager.getById(id);
      return item && item.rarity === rarity;
    });
  },
  byCategory(cat) {
    return Object.keys(G.inventory.items).filter(id => {
      const item = EquipmentManager.getById(id);
      return item && item.slot === cat;
    });
  },
  search(keyword) {
    return Object.keys(G.inventory.items).filter(id => {
      const item = EquipmentManager.getById(id);
      return item && item.name.includes(keyword);
    });
  },
};
