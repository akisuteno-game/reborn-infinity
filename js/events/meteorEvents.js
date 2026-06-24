const MeteorEvents = { tick(G){ if(RNG.chancePct(0.1/365)){ G.resources.materials+=RNG.int(50,200); Notification.log('隕石落下！レア素材獲得！'); } } };
