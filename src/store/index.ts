import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './reducers/login';
import registerReducer from './reducers/register';
import createActivityReducer from './reducers/createActivity';
import getActivityReducer from './reducers/getActivity';
import getUserActivitiesReducer from './reducers/getUserActivities';
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
import createGoalReducer from './reducers/createGoal';
import getGoalReducer from './reducers/getGoal';

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    getActivity: getActivityReducer,
    getUserActivities: getUserActivitiesReducer,
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
    createGoal: createGoalReducer,
    getGoal: getGoalReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
