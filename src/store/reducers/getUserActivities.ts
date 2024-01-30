/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ActivityState } from '../../@types/activity';
import { axiosInstance } from '../../utils/axios';

const initialState: ActivityState = {
  activity: {
    id: '',
    name: '',
    sport_id: '',
    date_scheduled: '',
    date_accomplished: '',
    distance: 0,
    duration: '',
    pace: 0,
    user_id: 0,
    hecho: false || true,
    sport: {
      id: 0,
      name: '',
    },
    steps: [],
    tags: [],
  },
  isLoading: true,
  error: null,
};

export const fetchUserActivities = createAsyncThunk(
  'activities/fetch',
  async (id: string) => {
    const { data } = await axiosInstance.get(`/workouts/user/${id}`);
    return data;
  }
);

const getUserActivitiesSlice = createSlice({
  name: 'getUserActivities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserActivities.fulfilled, (state, action) => {
        state.isLoading = false;

        const payloadKeys = Object.keys(action.payload);

        payloadKeys.forEach((key) => {
          if (action.payload[key] !== null) {
            state.activity[key] = action.payload[key];
          }
        });
      });
  },
});

export default getUserActivitiesSlice.reducer;
