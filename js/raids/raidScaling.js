const RaidScaling = {
  getScaledHp(boss,rebirthCount){ return Math.floor(boss.hp*(1+rebirthCount*0.1)); },
  getScaledAtk(boss,rebirthCount){ return Math.floor(boss.atk*(1+rebirthCount*0.05)); },
};
