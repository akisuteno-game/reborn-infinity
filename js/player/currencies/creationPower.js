const CreationPowerCurrency = { get(){ return G.resources.creationPower||0; }, add(n){ G.resources.creationPower=(G.resources.creationPower||0)+n; } };
