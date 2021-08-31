import { AsyncStorage } from "react-native";

const KEY = "@weatherApp/searchHistory";

export const getRecentSearch = () =>
  AsyncStorage.getItem(KEY).then(str => {
    if (str) {
      return JSON.parse(str);
    }

    return [];
  });

export const addRecentSearch = item => {
  return getRecentSearch().then(history => {
    const oldHistory = history.filter(
      existingItem => existingItem.id !== item.id // Prevents double-locations!
    );
    const newHistory = [item, ...oldHistory];

    return AsyncStorage.setItem(KEY, JSON.stringify(newHistory));
  });
};

// UPDATE: Clear Recent Search
export const clearRecentSearch = () => {
  AsyncStorage.removeItem(KEY);
};
