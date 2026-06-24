/* js/inventory/sorting.js */
const Sorting = {
  byName(items) { return [...items].sort((a, b) => a.name.localeCompare(b.name, 'ja')); },
  byRarity(items) {
    const order = ['divine','myth','legend','epic','rare','uncommon','common'];
    return [...items].sort((a, b) => order.indexOf(a.rarity) - order.indexOf(b.rarity));
  },
  byCount(items) { return [...items].sort((a, b) => (G.inventory.items[b.id]||0) - (G.inventory.items[a.id]||0)); },
};
