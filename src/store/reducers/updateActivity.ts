/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { Activity, ActivityState } from '../../@types/activity';

const initialState: ActivityState = {
  activity: {
    id: '',
    name: '',
    sport_id: '',
    date_scheduled: '',
    date_accomplished: '',
    distance: '' || 0,
    duration: '' || 0,
    pace: 0,
    user_id: 0,
    hecho: true || false,
    sport: {
      id: 0,
      name: '',
    },
    steps: [],
    tags: [],
  },
  isLoading: false,
  error: null,
};

export const updateActivity = createAsyncThunk(
  'updateActivity',
  async (activity: Activity) => {
    const { data } = await axiosInstance.patch(
      `/workout/${activity.id}`,
      activity
    );
    return data;
  }
);

const updateActivitySlice = createSlice({
  name: 'updateActivity',
  initialState,
  reducers: {
    changeInputActivityValue(
      state,
      action: PayloadAction<{
        fieldName: keyof ActivityState['activity'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.activity[fieldName] = value as never;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateActivity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateActivity.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(updateActivity.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { changeInputActivityValue } = updateActivitySlice.actions;
export default updateActivitySlice.reducer;
