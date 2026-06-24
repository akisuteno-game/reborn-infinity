const CreatorWorlds = { create(){ G.creator.worlds.push({id:Date.now(),created:G.meta.playTime}); Notification.log('新たな世界を創造！'); } };
