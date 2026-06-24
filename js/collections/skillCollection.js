const SkillCollection = { register(id){if(!G.collection.skills.includes(id))G.collection.skills.push(id);}, getAll(){return G.collection.skills;} };
