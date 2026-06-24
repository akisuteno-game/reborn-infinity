const DimensionEnergyCurrency = { get(){ return G.resources.dimensionEnergy||0; }, add(n){ G.resources.dimensionEnergy=(G.resources.dimensionEnergy||0)+n; } };
