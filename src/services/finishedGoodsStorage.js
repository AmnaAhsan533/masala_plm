
import { initialFinishedGoods } from "../data/finishedGoodsData";

const STORAGE_KEY = "masalaplm-finished-goods";

export const getAllFinishedGoods = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Could not load finished goods:", error);
  }

  return initialFinishedGoods;
};

export const getFinishedGoodBySku = (sku) => {
  return getAllFinishedGoods().find(
    (product) => product.sku === sku
  ) || null;
};
