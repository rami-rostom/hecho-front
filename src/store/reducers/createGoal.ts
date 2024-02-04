/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { NewGoal, NewGoalState } from '../../@types/goal';

const initialState: NewGoalState = {
  goal: {
    activity: 0,
    distance: 0,
    duration: '',
    user_id: 0,
  },
  isLoading: false,
  error: null,
};

export const createGoal = createAsyncThunk(
  'createGoal',
  async (newGoal: NewGoal) => {
    const { data } = await axiosInstance.post('/goal', newGoal);
    return data;
  }
);

const createGoalSlice = createSlice({
  name: 'createGoal',
  initialState,
  reducers: {
    changeInputGoalValue(
      state,
      action: PayloadAction<{
        fieldName: keyof NewGoalState['goal'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.goal[fieldName] = value as never;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGoal.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(createGoal.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { changeInputGoalValue } = createGoalSlice.actions;
export default createGoalSlice.reducer;
