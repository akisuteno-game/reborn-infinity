const CausalityPointsCurrency = { get(){ return G.resources.causalityPoints||0; }, add(n){ G.resources.causalityPoints=(G.resources.causalityPoints||0)+n; } };
