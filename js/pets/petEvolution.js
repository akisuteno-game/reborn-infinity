/* js/pets/petEvolution.js */
const PetEvolution = {
  canEvolve(petId) {
    return (G.pets.levels[petId] || 1) >= 50 && G.resources.materials >= 100;
  },
  evolve(petId) {
    if (!this.canEvolve(petId)) return false;
    G.resources.materials -= 100;
    if (!G.pets.evolved) G.pets.evolved = {};
    G.pets.evolved[petId] = true;
    Notification.log(PET_DATA.find(p=>p.id===petId)?.name + 'が進化！');
    return true;
  },
  isEvolved(petId) { return G.pets.evolved?.[petId] || false; },
};
