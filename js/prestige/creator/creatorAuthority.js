const CreatorAuthority = { hasAuthority(){ return G.tier>=15; }, getBonus(stat){ return G.creator.worlds.length*0.01; } };
