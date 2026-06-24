/* js/crafting/craftManager.js */
const CraftManager = {
  canCraft(recipeId) {
    const r = RECIPE_DATA.find(r => r.id === recipeId);
    if (!r) return false;
    if (r.reqFame && G.resources.fame < r.reqFame) return false;
    if (G.resources.materials < r.mat)             return false;
    if (G.resources.coins     < r.coin)            return false;
    return true;
  },
  craft(recipeId) {
    if (!this.canCraft(recipeId)) return false;
    const r = RECIPE_DATA.find(r => r.id === recipeId);
    G.resources.materials -= r.mat;
    G.resources.coins     -= r.coin;
    G.inventory.items[r.result] = (G.inventory.items[r.result] || 0) + 1;
    if (!G.equipment.owned.includes(r.result)) G.equipment.owned.push(r.result);
    G.craft.totalCrafted++;
    Notification.log(r.name + 'をクラフト！');
    EventBus.emit(GAME_EVENTS.CRAFT_SUCCESS, { recipeId });
    return true;
  },
  getDisplayList() {
    return RECIPE_DATA.map(r => ({
      ...r, canCraft: this.canCraft(r.id),
      owned: G.inventory.items[r.result] || 0,
    }));
  },
};
