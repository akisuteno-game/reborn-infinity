const VoidEvents = { tick(G){ if(G.tier<14)return; if(RNG.chancePct(0.1/365)){ G.resources.voidEnergy+=RNG.int(10,50); Notification.log('虚無の裂け目が出現！'); } } };
