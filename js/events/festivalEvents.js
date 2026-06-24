const FestivalEvents = { tick(G){ if(RNG.chancePct(0.3/365)){ const bonus=RNG.int(100,500); G.resources.coins+=bonus; Notification.log('お祭り！コイン+'+bonus); } } };
