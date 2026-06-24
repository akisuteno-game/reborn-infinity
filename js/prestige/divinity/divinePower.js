const DivinePower = { add(n){ G.resources.divinePower+=n; }, spend(n){ if(G.resources.divinePower<n)return false; G.resources.divinePower-=n; return true; } };
