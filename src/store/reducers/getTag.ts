/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { TagState } from '../../@types/tag';

const initialState: TagState = {
  tags: {
    id: '',
    name: '',
    user_id: 0,
  },
  isLoading: true,
  error: null,
};

export const fetchTag = createAsyncThunk('tag/fetch', async (id: number) => {
  const { data } = await axiosInstance.get(`/tags/user/${id}`);
  return data;
});

const getTagSlice = createSlice({
  name: 'getStep',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTag.fulfilled, (state, action) => {
        state.isLoading = false;

        const payloadKeys = Object.keys(action.payload);

        payloadKeys.forEach((key) => {
          if (action.payload[key] !== null) {
            state.tags[key] = action.payload[key];
          }
        });
      });
  },
});

export default getTagSlice.reducer;
