/* js/quests/hiddenQuests.js */
const HIDDEN_QUEST_DATA = [
  { id: 'secret_1', name: '???', desc: '隠されたクエスト', cond: g => g.rebirth.count >= 10 && g.battle.dragonKills >= 10, reward: { soulFragments: 1000 }, hint: '竜を多く倒し、転生を重ねよ' },
  { id: 'secret_2', name: '???', desc: '隠されたクエスト', cond: g => g.time.age >= 60 && g.resources.coins >= 100000, reward: { mat: 5000 }, hint: '老いて富を積み上げよ' },
];
Object.freeze(HIDDEN_QUEST_DATA);
