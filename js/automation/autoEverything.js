const AutomationSystem = {
  tick(G){
    AutoExplore.tick(G);
    AutoCraft.tick(G);
    AutoEquip.tick(G);
    AutoJob.tick(G);
    AutoRebirth.tick(G);
    AutoAwakening.tick(G);
  }
};
