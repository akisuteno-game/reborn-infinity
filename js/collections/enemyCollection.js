const EnemyCollection = { register(id){if(!G.collection.enemies.includes(id))G.collection.enemies.push(id);}, getAll(){return G.collection.enemies;} };
