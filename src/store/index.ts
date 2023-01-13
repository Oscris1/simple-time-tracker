import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import reactotron from '../../ReactotronConfig'
import { tasksSlice } from './tasksSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //   blacklist: ['tasks'],
}

const rootReducer = combineReducers({
  tasks: tasksSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  enhancers: [reactotron!.createEnhancer!()],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// export const tasksSelector = tasksAdapter.getSelectors<RootState>((state) => state.tasks)

// export const currentTask = tasksAdapter
//   .getSelectors<RootState>((state) => state.tasks)
//   .selectById(state, state.tasks.current)

export default store
