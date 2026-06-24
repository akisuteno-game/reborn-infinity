const InfinityPoints = { add(n){ G.resources.infinityPoints+=n; }, spend(n){ if(G.resources.infinityPoints<n)return false; G.resources.infinityPoints-=n; return true; } };
