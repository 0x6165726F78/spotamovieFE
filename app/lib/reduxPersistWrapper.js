import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
const DEBOUNCE_TIME_MILLISECONDS = 4000;

export function persistStoreAsync(store) {
  return persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['user', 'moviesCached', 'moviesLiked', 'moviesDisliked'],
    debounce: DEBOUNCE_TIME_MILLISECONDS,
  });
}

export function purgeStoreAsync(store) {
  return persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['user', 'moviesCached', 'moviesLiked', 'moviesDisliked'],
  }).purge();
}
