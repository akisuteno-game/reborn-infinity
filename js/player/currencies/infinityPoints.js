const InfinityPointsCurrency = { get(){ return G.resources.infinityPoints||0; }, add(n){ G.resources.infinityPoints=(G.resources.infinityPoints||0)+n; } };
