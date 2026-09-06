// store.ts
import {
  configureStore,
  //PayloadAction,
  Middleware as ReduxMiddleware,
  Reducer,
} from "@reduxjs/toolkit";
import { rootSaga } from "./root.saga";
import rootReducer from "./root.reducer";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
//import { createLogger } from "redux-logger";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// Handle storage for SSR
const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: any, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: any) {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accessibility"], // <-- Persist only on client
  timeout: 500, // Add timeout to prevent blocking
};

export const reducer: Reducer<RootState, any> = (state, action): RootState => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, reducer);

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // const loggerMiddleware = createLogger({
  //   collapsed: true,
  //   diff: true,
  // });

  const middlewares: Array<SagaMiddleware | ReduxMiddleware> = [sagaMiddleware];

  // if (process.env.NODE_ENV === "development") {
  //   middlewares.push(loggerMiddleware);
  // }
  const isClient = typeof window !== "undefined";

  const store = configureStore({
    reducer: isClient ? persistedReducer : reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
        immutableCheck: false, // Disable for performance
      }).concat(middlewares),
  });

  // Run root saga
  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  // Only persist on client
  if (isClient) {
    (store as any).__persistor = persistStore(store);
  }
  return store;
};

// Create wrapper
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(makeStore());
export const store = makeStore();
