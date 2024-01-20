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

export const removeStep = createAsyncThunk(
  'removeStep',
  // TODO: change any type for stepId
  async (stepId: any) => {
    const { data } = await axiosInstance.patch(
      `/workout/${stepId.workoutId}/step/remove`,
      stepId
    );

    return data;
  }
);

const removeStepSlice = createSlice({
  name: 'addStep',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(removeStep.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeStep.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(removeStep.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default removeStepSlice.reducer;
