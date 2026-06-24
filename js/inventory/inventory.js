/* js/inventory/inventory.js */
const Inventory = {
  add(itemId, count = 1) {
    G.inventory.items[itemId] = (G.inventory.items[itemId] || 0) + count;
  },
  remove(itemId, count = 1) {
    if (!G.inventory.items[itemId]) return false;
    G.inventory.items[itemId] -= count;
    if (G.inventory.items[itemId] <= 0) delete G.inventory.items[itemId];
    return true;
  },
  has(itemId, count = 1) { return (G.inventory.items[itemId] || 0) >= count; },
  getAll() { return G.inventory.items; },
  getCount(itemId) { return G.inventory.items[itemId] || 0; },
  getUsedSlots() { return Object.keys(G.inventory.items).length; },
  isFull() { return this.getUsedSlots() >= G.inventory.maxSlots; },
};
