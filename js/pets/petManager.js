/* js/pets/petManager.js */
const PetManager = {
  tick(G) {
    PetExpeditions.tick();
    // アクティブペットにXP付与
    G.pets.active.forEach(petId => PetLevels.addXp(petId, 0.5));
  },
  getStatBonus(stat) {
    let total = 0;
    G.pets.active.forEach(petId => {
      const pet = PET_DATA.find(p => p.id === petId);
      if (!pet || !pet.bonus[stat]) return;
      total += pet.bonus[stat] * PetLevels.getLevelMult(petId) * (PetEvolution.isEvolved(petId) ? 2 : 1);
    });
    return total;
  },
  obtain(petId) {
    if (G.pets.owned.includes(petId)) return false;
    G.pets.owned.push(petId);
    Notification.log(PET_DATA.find(p=>p.id===petId)?.name + 'を入手！');
    return true;
  },
  activate(petId) {
    if (!G.pets.owned.includes(petId)) return false;
    if (G.pets.active.length >= CONSTANTS.PET_MAX_ACTIVE) return false;
    if (!G.pets.active.includes(petId)) G.pets.active.push(petId);
    return true;
  },
  deactivate(petId) {
    G.pets.active = G.pets.active.filter(id => id !== petId);
  },
  getDisplayList() {
    return PET_DATA.map(p => ({
      ...p,
      owned:    G.pets.owned.includes(p.id),
      active:   G.pets.active.includes(p.id),
      level:    G.pets.levels[p.id] || 1,
      evolved:  PetEvolution.isEvolved(p.id),
      canGet:   G.resources.fame >= p.reqFame && (!p.reqRebirth || G.rebirth.count >= p.reqRebirth),
    }));
  },
};
