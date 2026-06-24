const Essence = { add(n){ G.resources.transcendenceEssence+=n; }, spend(n){ if(G.resources.transcendenceEssence<n)return false; G.resources.transcendenceEssence-=n; return true; } };
