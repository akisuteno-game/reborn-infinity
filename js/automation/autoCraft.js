const AutoCraft = { tick(G){ if(!Config.get('autoCraft'))return; for(const r of RECIPE_DATA){ if(CraftManager.canCraft(r.id)){ CraftManager.craft(r.id); break; } } } };
