/* js/quests/questManager.js */
const QuestManager = {
  _allQuests() {
    return [...MAIN_QUEST_DATA, ...SIDE_QUEST_DATA, ...ACHIEVEMENT_QUEST_DATA, ...HIDDEN_QUEST_DATA];
  },
  tick(G) {
    for (const quest of this._allQuests()) {
      if (G.quests.completed.includes(quest.id)) continue;
      if (!quest.cond(G)) continue;
      this._complete(quest);
    }
  },
  _complete(quest) {
    G.quests.completed.push(quest.id);
    if (quest.reward.coin)           G.resources.coins          += quest.reward.coin;
    if (quest.reward.mat)            G.resources.materials      += quest.reward.mat;
    if (quest.reward.soulFragments)  G.resources.soulFragments  += quest.reward.soulFragments;
    Notification.log('クエスト達成: 「' + quest.name + '」');
    EventBus.emit(GAME_EVENTS.QUEST_COMPLETE, { questId: quest.id });
  },
  isCompleted(id) { return G.quests.completed.includes(id); },
  getMainQuests()  { return MAIN_QUEST_DATA.map(q => ({ ...q, completed: this.isCompleted(q.id) })); },
  getSideQuests()  { return SIDE_QUEST_DATA.map(q => ({ ...q, completed: this.isCompleted(q.id) })); },
};
