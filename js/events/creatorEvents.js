const CreatorEvents = { tick(G){ if(G.tier<15)return; if(RNG.chancePct(0.05/365)){ G.resources.creatorPower+=RNG.int(1,10); Notification.log('創造主の啓示！'); } } };
