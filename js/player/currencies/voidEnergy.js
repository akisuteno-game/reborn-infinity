const VoidEnergyCurrency = { get(){ return G.resources.voidEnergy||0; }, add(n){ G.resources.voidEnergy=(G.resources.voidEnergy||0)+n; } };
