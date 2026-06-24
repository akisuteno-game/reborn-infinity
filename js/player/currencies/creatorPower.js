const CreatorPowerCurrency = { get(){ return G.resources.creatorPower||0; }, add(n){ G.resources.creatorPower=(G.resources.creatorPower||0)+n; } };
