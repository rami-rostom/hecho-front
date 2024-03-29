/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ActivityState } from '../../@types/activity';
import { axiosInstance } from '../../utils/axios';

const initialState: ActivityState = {
  activity: {
    id: '',
    name: '',
    sport_id: '',
    date_scheduled: '',
    date_accomplished: '',
    distance: 0,
    duration: '',
    pace: 0,
    user_id: 0,
    hecho: false || true,
    sport: {
      id: 0,
      name: '',
    },
    steps: [],
    tags: [],
  },
  isLoading: true,
  error: null,
};

export const fetchActivity = createAsyncThunk(
  'activity/fetch',
  async (id: string) => {
    const { data } = await axiosInstance.get(`/workout/${id}`);
    return data;
  }
);

const getActivitySlice = createSlice({
  name: 'getActivity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activity = action.payload;
      });
  },
});

export default getActivitySlice.reducer;
