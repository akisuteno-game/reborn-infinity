/* js/exploration/treasure.js - 宝箱・ドロップ管理 */
const Treasure = {
  roll(regionId) {
    if (!RNG.chancePct(5)) return null;
    const mat  = RNG.int(5, 30);
    const coin = RNG.int(10, 100);
    return { mat, coin, rarity: RNG.rarity() };
  },
  open(treasure) {
    if (!treasure) return;
    G.resources.materials += treasure.mat;
    G.resources.coins     += treasure.coin;
    Notification.log(`宝箱発見！素材+${treasure.mat} コイン+${treasure.coin} [${CONSTANTS.RARITY_LABEL[treasure.rarity]}]`);
  },
};
