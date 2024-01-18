/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Step, StepState } from '../../@types/step';
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

export const createStep = createAsyncThunk(
  'createStep',
  async (newStep: Step) => {
    const { data } = await axiosInstance.post('/step', newStep);
    return data;
  }
);

const createStepSlice = createSlice({
  name: 'createStep',
  initialState,
  reducers: {
    changeInputStepValue(
      state,
      action: PayloadAction<{
        fieldName: keyof StepState['steps'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.steps[fieldName] = value as never;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createStep.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStep.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(createStep.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { changeInputStepValue } = createStepSlice.actions;
export default createStepSlice.reducer;
