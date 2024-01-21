/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { StepState } from '../../@types/step';

const initialState: StepState = {
  step: {
    id: '',
    name: '',
    distance: '',
    duration: '',
    user_id: 0,
  },
  isLoading: true,
  error: null,
};

export const fetchStep = createAsyncThunk('step/fetch', async (id: string) => {
  const { data } = await axiosInstance.get(`/step/${id}`);
  return data;
});

const getStepSlice = createSlice({
  name: 'getStep',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStep.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStep.fulfilled, (state, action) => {
        state.isLoading = false;

        const payloadKeys = Object.keys(action.payload);

        payloadKeys.forEach((key) => {
          if (action.payload[key] !== null) {
            state.step[key] = action.payload[key];
          }
        });
      });
  },
});

export default getStepSlice.reducer;
