const AwakeningCrystals = { add(n){ G.resources.awakeningCrystals+=n; }, spend(n){ if(G.resources.awakeningCrystals<n)return false; G.resources.awakeningCrystals-=n; return true; } };
