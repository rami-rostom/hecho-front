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

export const updateStep = createAsyncThunk(
  'updateStep',
  // TODO: change unknown type for stepId
  async (stepId: unknown) => {
    const { data } = await axiosInstance.patch(`/workout/1/step`, stepId);

    return data;
  }
);

const updateStepSlice = createSlice({
  name: 'updateStep',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateStep.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStep.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(updateStep.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default updateStepSlice.reducer;
