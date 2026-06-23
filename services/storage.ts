import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "../constants/storageKeys";

export const getBestScore = async (): Promise<number> => {
  try {
    const savedValue = await AsyncStorage.getItem(STORAGE_KEYS.BEST_SCORE);

    if (savedValue === null) {
      return 0;
    }

    const parsedValue = Number.parseInt(savedValue, 10);

    if (Number.isNaN(parsedValue) || parsedValue < 0) {
      return 0;
    }

    return parsedValue;
  } catch {
    throw new Error("READ_BEST_SCORE_ERROR");
  }
};

export const saveBestScore = async (score: number): Promise<void> => {
  if (!Number.isInteger(score) || score < 0) {
    throw new Error("INVALID_BEST_SCORE");
  }

  try {
    await AsyncStorage.setItem(STORAGE_KEYS.BEST_SCORE, String(score));
  } catch {
    throw new Error("SAVE_BEST_SCORE_ERROR");
  }
};
