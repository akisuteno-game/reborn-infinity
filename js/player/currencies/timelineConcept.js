const TimelineConceptCurrency = { get(){ return G.resources.timelineEnergy||0; }, add(n){ G.resources.timelineEnergy=(G.resources.timelineEnergy||0)+n; } };
