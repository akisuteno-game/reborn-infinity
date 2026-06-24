const SoulFragmentsCurrency = { get(){ return G.resources.soulFragments||0; }, add(n){ G.resources.soulFragments=(G.resources.soulFragments||0)+n; } };
