/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StepState } from '../../@types/step';
import { axiosInstance } from '../../utils/axios';

const initialState: StepState = {
  step: {
    id: '',
    name: '',
    distance: 0,
    duration: '',
    user_id: 0,
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
  name: 'removeStep',
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
