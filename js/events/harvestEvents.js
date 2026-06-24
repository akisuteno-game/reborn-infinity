const HarvestEvents = { tick(G){ if(RNG.chancePct(0.5/365)){ G.resources.materials+=RNG.int(10,50); Notification.log('豊作イベント！素材獲得'); } } };
