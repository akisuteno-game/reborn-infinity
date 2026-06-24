/* js/pets/petExpeditions.js */
const PetExpeditions = {
  _expeditions: {},
  send(petId, regionId) {
    if (!G.pets.owned.includes(petId)) return false;
    this._expeditions[petId] = { regionId, progress: 0, ticks: 200 };
    Notification.log(PET_DATA.find(p=>p.id===petId)?.name + 'を探索に送った！');
    return true;
  },
  tick() {
    for (const petId in this._expeditions) {
      const exp = this._expeditions[petId];
      exp.progress++;
      if (exp.progress >= exp.ticks) {
        const mat  = RNG.int(5, 20);
        G.resources.materials += mat;
        Notification.log(PET_DATA.find(p=>p.id===petId)?.name + 'が探索から戻った！素材+' + mat);
        delete this._expeditions[petId];
      }
    }
  },
};
