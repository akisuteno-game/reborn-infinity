const EventCollection = { register(id){if(!G.collection.events.includes(id))G.collection.events.push(id);}, getAll(){return G.collection.events;} };
