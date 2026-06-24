const RaidRewards = {
  give(boss){ G.resources.coins+=boss.coin; G.resources.materials+=Math.floor(boss.coin/10); Notification.log('レイド報酬: コイン+'+boss.coin); }
};
