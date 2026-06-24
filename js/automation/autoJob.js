const AutoJob = { tick(G){ if(!Config.get('autoJob'))return; const best=JobUnlocks.getUnlocked().sort((a,b)=>b.income-a.income)[0]; if(best&&best.id!==G.jobs.current)JobManager.select(best.id); } };
