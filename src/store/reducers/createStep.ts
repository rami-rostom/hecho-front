/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewStepState, NewStep } from '../../@types/step';
import { axiosInstance } from '../../utils/axios';

const initialState: NewStepState = {
  step: {
    name: '',
    distance: 0,
    duration: '',
    user_id: 1,
  },
  isLoading: false,
  error: null,
};

export const createStep = createAsyncThunk(
  'createStep',
  async (newStep: NewStep) => {
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
        fieldName: keyof NewStepState['step'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.step[fieldName] = value as never;
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
