/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewActivity, NewActivityState } from '../../@types/activity';
import { axiosInstance } from '../../utils/axios';

const initialState: NewActivityState = {
  newActivity: {
    name: '',
    sport_id: '',
    date_scheduled: '',
    user_id: 0,
    hecho: false,
  },
  isLoading: false,
  error: null,
};

export const createActivity = createAsyncThunk(
  'createActivity',
  async (newActivity: NewActivity) => {
    const { data } = await axiosInstance.post('/workout', newActivity);
    return data;
  }
);

const createActivitySlice = createSlice({
  name: 'createActivity',
  initialState,
  reducers: {
    changeInputActivityValue(
      state,
      action: PayloadAction<{
        fieldName: keyof NewActivityState['newActivity'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.newActivity[fieldName] = value as never;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createActivity.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(createActivity.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { changeInputActivityValue } = createActivitySlice.actions;
export default createActivitySlice.reducer;
