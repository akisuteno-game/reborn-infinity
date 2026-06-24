/* js/inventory/storage.js */
const Storage = {
  expandSlots(amount) { G.inventory.maxSlots += amount; },
  getMaxSlots() { return G.inventory.maxSlots; },
  getUsedSlots() { return Inventory.getUsedSlots(); },
  getFreeSlots() { return this.getMaxSlots() - this.getUsedSlots(); },
};
