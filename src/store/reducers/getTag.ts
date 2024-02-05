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
        state.tags = action.payload;
      });
  },
});

export default getTagSlice.reducer;
