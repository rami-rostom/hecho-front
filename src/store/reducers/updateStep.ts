/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StepState, Step } from '../../@types/step';
import { axiosInstance } from '../../utils/axios';

const initialState: StepState = {
  step: {
    id: '',
    name: '',
    distance: '',
    duration: '',
    user_id: 1,
  },
  isLoading: false,
  error: null,
};

export const updateStep = createAsyncThunk('updateStep', async (step: Step) => {
  const { data } = await axiosInstance.patch(`/step/${step.id}`, step);
  return data;
});

const updateStepSlice = createSlice({
  name: 'updateStep',
  initialState,
  reducers: {
    changeInputStepValue(
      state,
      action: PayloadAction<{
        fieldName: keyof StepState['step'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.step[fieldName] = value as never;
    },
  },
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

export const { changeInputStepValue } = updateStepSlice.actions;
export default updateStepSlice.reducer;
