const ItemCollection = { register(id){if(!G.collection.items.includes(id))G.collection.items.push(id);}, getAll(){return G.collection.items;} };
