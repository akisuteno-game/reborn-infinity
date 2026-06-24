const RegionCollection = { register(id){if(!G.collection.regions.includes(id))G.collection.regions.push(id);}, getAll(){return G.collection.regions;} };
