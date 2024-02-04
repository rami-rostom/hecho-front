/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { Goal, UpdateGoalState } from '../../@types/goal';

const initialState: UpdateGoalState = {
  goal: {
    id: '',
    activity: 0,
    distance: 0,
    duration: '',
    user_id: 0,
  },
  isLoading: false,
  error: null,
};

export const updateGoal = createAsyncThunk('updateGoal', async (goal: Goal) => {
  const { data } = await axiosInstance.patch(`/goal/${goal.id}`, goal);
  return data;
});

const updateGoalSlice = createSlice({
  name: 'updateGoal',
  initialState,
  reducers: {
    changeInputGoalValue(
      state,
      action: PayloadAction<{
        fieldName: keyof UpdateGoalState['goal'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.goal[fieldName] = value as never;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGoal.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(updateGoal.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { changeInputGoalValue } = updateGoalSlice.actions;
export default updateGoalSlice.reducer;
