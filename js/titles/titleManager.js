const TitleManager = {
  getAll()     { return G.titles.unlocked; },
  equip(title) { if(G.titles.unlocked.includes(title)) G.titles.equipped = title; },
  getEquipped(){ return G.titles.equipped || ''; },
};
