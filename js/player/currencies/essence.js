const EssenceCurrency = { get(){ return G.resources.transcendenceEssence||0; }, add(n){ G.resources.transcendenceEssence=(G.resources.transcendenceEssence||0)+n; } };
