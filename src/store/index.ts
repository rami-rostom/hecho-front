import { configureStore } from '@reduxjs/toolkit';

import createActivityReducer from './reducers/createActivity';
import getActivityReducer from './reducers/getActivity';
import hechoReducer from './reducers/hecho';
import stepReducer from './reducers/createStep';
import addStepReducer from './reducers/addStep';
import removeStepReducer from './reducers/removeStep';
import deleteActivityReducer from './reducers/deleteActivity';

const store = configureStore({
  reducer: {
    createActivity: createActivityReducer,
    getActivity: getActivityReducer,
    hecho: hechoReducer,
    createStep: stepReducer,
    addStep: addStepReducer,
    removeStep: removeStepReducer,
    deleteActivity: deleteActivityReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
