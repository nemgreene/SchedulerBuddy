import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./DateSlice";
import PhenomeSlice from "./PhenomeSlice";

export const store = configureStore({
  reducer: {
    dates: dateSlice,
    phenome: PhenomeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
