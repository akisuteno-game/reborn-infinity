const DivineFragmentsCurrency = { get(){ return G.resources.faithPoints||0; }, add(n){ G.resources.faithPoints=(G.resources.faithPoints||0)+n; } };
