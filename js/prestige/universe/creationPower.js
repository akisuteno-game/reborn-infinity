const CreationPower = { add(n){ G.resources.creationPower+=n; }, spend(n){ if(G.resources.creationPower<n)return false; G.resources.creationPower-=n; return true; } };
