const TitleCollection = { register(id){if(!G.collection.titles.includes(id))G.collection.titles.push(id);}, getAll(){return G.collection.titles;} };
