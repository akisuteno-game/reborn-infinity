/* js/achievements/equipmentAchievements.js */
const EQUIPMENT_ACHIEVEMENTS = [
  { id: 'equip_1', name: '初クラフト',  desc: 'アイテムを初めてクラフトする', icon: '🔨', rarity: 'common',   points: 10, check: g => g.craft.totalCrafted >= 1 },
  { id: 'equip_2', name: '鍛冶師',      desc: 'アイテムを10個クラフトする',   icon: '⚒️', rarity: 'uncommon', points: 25, check: g => g.craft.totalCrafted >= 10 },
  { id: 'equip_3', name: '装備コレクター',desc: '5種類の装備を入手する',      icon: '🛡️', rarity: 'rare',     points: 40, check: g => g.equipment.owned.length >= 5 },
];
Object.freeze(EQUIPMENT_ACHIEVEMENTS);
