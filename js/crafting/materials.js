/* js/crafting/materials.js */
const MATERIAL_DATA = [
  { id: 'herb',        name: '薬草',     icon: '🌿', desc: '採集で入手',   stackMax: 9999 },
  { id: 'iron_ore',    name: '鉄鉱石',   icon: '⛏️', desc: '採掘で入手',   stackMax: 9999 },
  { id: 'magic_crystal',name:'魔法結晶', icon: '💎', desc: '魔物討伐で入手',stackMax: 9999 },
  { id: 'dragon_scale',name: '龍鱗',     icon: '🐉', desc: '龍討伐で入手', stackMax: 999  },
];
Object.freeze(MATERIAL_DATA);
