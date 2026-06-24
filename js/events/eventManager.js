const EventManager = {
  tick(G){
    HarvestEvents.tick(G);
    MeteorEvents.tick(G);
    FestivalEvents.tick(G);
    VoidEvents.tick(G);
    CreatorEvents.tick(G);
  }
};
