const AutoRebirth = { tick(G){ if(!Config.get('autoRebirth'))return; if(!G.time.isDead)return; EventBus.emit(GAME_EVENTS.REBIRTH,{}); } };
