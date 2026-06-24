const VoidCore = { level:0, upgrade(){ if(G.resources.voidEnergy<100)return; G.resources.voidEnergy-=100; this.level++; Notification.log('虚無コア Lv'+this.level+'！'); } };
