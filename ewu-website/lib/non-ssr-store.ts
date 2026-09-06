import rootReducer from "./root.reducer";
import {
  configureStore,
  Middleware as ReduxMiddleware,
} from "@reduxjs/toolkit";
import { rootSaga } from "./root.saga";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { createLogger } from "redux-logger";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const rootSagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLogger({
  collapsed: true,
  diff: true,
});

const middleware: Array<SagaMiddleware | ReduxMiddleware> = [
  rootSagaMiddleware,
];

// if (process.env.NODE_ENV === "development") {
//   middleware.push(loggerMiddleware);
// }

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: false,
    }).prepend(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

rootSagaMiddleware.run(rootSaga);

export type AppStoreType = typeof store;
export type AppDispatch = typeof store.dispatch;
export type StoreStateType = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
