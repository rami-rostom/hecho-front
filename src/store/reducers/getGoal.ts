/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { GoalState } from '../../@types/goal';

const initialState: GoalState = {
  goal: [],
  isLoading: true,
  error: null,
};

export const fetchGoal = createAsyncThunk('goal/fetch', async (id: number) => {
  const { data } = await axiosInstance.get(`/goal/user/${id}`);
  return data;
});

const getGoalSlice = createSlice({
  name: 'getGoal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGoal.fulfilled, (state, action) => {
        state.isLoading = false;

        const payloadKeys = Object.keys(action.payload);

        payloadKeys.forEach((key) => {
          if (action.payload[key] !== null) {
            state.goal[key] = action.payload[key];
          }
        });
      });
  },
});

export default getGoalSlice.reducer;
