/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StepState } from '../../@types/step';
import { axiosInstance } from '../../utils/axios';

const initialState: StepState = {
  steps: {
    id: '',
    name: '',
    distance: '',
    duration: '',
    user_id: 1,
  },
  isLoading: false,
  error: null,
};

export const addStep = createAsyncThunk(
  'addStep',
  // TODO: change any type for stepId
  async (stepId: any) => {
    const { data } = await axiosInstance.patch(
      `/workout/${stepId.workoutId}/step/add`,
      stepId
    );

    return data;
  }
);

const addStepSlice = createSlice({
  name: 'addStep',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addStep.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addStep.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(addStep.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default addStepSlice.reducer;
