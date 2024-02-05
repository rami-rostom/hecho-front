/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ActivitiesState } from '../../@types/activity';
import { axiosInstance } from '../../utils/axios';

const initialState: ActivitiesState = {
  activity: [],
  isLoading: true,
  error: null,
};

export const fetchUserActivities = createAsyncThunk(
  'activities/fetch',
  async (id: number) => {
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
        state.activity = action.payload;
      });
  },
});

export default getUserActivitiesSlice.reducer;
