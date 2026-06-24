const JobCollection = { register(id){if(!G.collection.jobs.includes(id))G.collection.jobs.push(id);}, getAll(){return G.collection.jobs;} };
