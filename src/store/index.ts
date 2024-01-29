import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './reducers/login';
import createActivityReducer from './reducers/createActivity';
import getActivityReducer from './reducers/getActivity';
import hechoReducer from './reducers/hecho';
import stepReducer from './reducers/createStep';
import addStepReducer from './reducers/addStep';
import removeStepReducer from './reducers/removeStep';
import deleteActivityReducer from './reducers/deleteActivity';
import getStepReducer from './reducers/getStep';
import updateStepReducer from './reducers/updateStep';
import updateActivityReducer from './reducers/updateActivity';
import getTagReducer from './reducers/getTag';
import addTagReducer from './reducers/addTag';
import updateTagReducer from './reducers/updateTag';

const store = configureStore({
  reducer: {
    login: loginReducer,
    getActivity: getActivityReducer,
    createActivity: createActivityReducer,
    updateActivity: updateActivityReducer,
    deleteActivity: deleteActivityReducer,
    getStep: getStepReducer,
    createStep: stepReducer,
    addStep: addStepReducer,
    updateStep: updateStepReducer,
    removeStep: removeStepReducer,
    hecho: hechoReducer,
    getTag: getTagReducer,
    addTag: addTagReducer,
    updateTag: updateTagReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
