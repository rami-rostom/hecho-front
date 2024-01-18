import { configureStore } from '@reduxjs/toolkit';

import createActivityReducer from './reducers/createActivity';
import activityReducer from './reducers/activity';
import hechoReducer from './reducers/hecho';
import stepReducer from './reducers/step';

const store = configureStore({
  reducer: {
    createActivity: createActivityReducer,
    activity: activityReducer,
    hecho: hechoReducer,
    createStep: stepReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
